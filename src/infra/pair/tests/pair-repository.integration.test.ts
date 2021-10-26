import { createContext } from "../../shared/context"
import { PairRepository } from "../pair-repository"
import { Pair } from "../../../domain/pair/pair"
import { PairId } from "../../../domain/pair/pair-id"
import { PairName } from "../../../domain/pair/pair-name"
import { TeamId } from "../../../domain/team/team-id"
import { ParticipantId } from "../../../domain/participant/participant-id"
import {
  generatePair,
  generateTeam,
  generateUser,
} from "../../util/db-value-generator"

describe(`PairRepository`, () => {
  const context = createContext()

  let pairRepository: PairRepository
  beforeEach(() => {
    pairRepository = new PairRepository(context)
  })

  beforeAll(async () => {
    await context.prisma.pair.create({
      data: {
        ...generatePair("a"),
        teams: {
          create: generateTeam("1"),
        },
        users: {
          create: [generateUser("01"), generateUser("02"), generateUser("03")],
        },
      },
    })
    await context.prisma.pair.create({
      data: {
        ...generatePair("b"),
        teams: {
          create: generateTeam("2"),
        },
        users: {
          create: [generateUser("04"), generateUser("05")],
        },
      },
    })
  })

  afterAll(async () => {
    await context.prisma.pair.deleteMany()
    await context.prisma.$disconnect()
  })

  describe(`insert()`, () => {
    // 省略
  })

  describe(`getAllPairList()`, () => {
    it(`ペアのリストを返す`, async () => {
      const actual = await pairRepository.getAllPairList()
      const expected = [
        Pair.reconstruct(PairId.reconstruct("id-pair-a"), {
          name: PairName.reconstruct("a"),
          teamId: TeamId.reconstruct("id-team-1"),
          participantIdList: [
            ParticipantId.reconstruct("id-user-01"),
            ParticipantId.reconstruct("id-user-02"),
            ParticipantId.reconstruct("id-user-03"),
          ],
        }),
        Pair.reconstruct(PairId.reconstruct("id-pair-b"), {
          name: PairName.reconstruct("b"),
          teamId: TeamId.reconstruct("id-team-2"),
          participantIdList: [
            ParticipantId.reconstruct("id-user-04"),
            ParticipantId.reconstruct("id-user-05"),
          ],
        }),
      ]
      expect(actual).toStrictEqual(expected)
    })
  })

  describe(`getPairListInTeam()`, () => {
    it(`あるチームに所属しているペアのリストを返す`, async () => {
      const teamId = TeamId.reconstruct("id-team-1")
      const actual = await pairRepository.getPairListInTeam(teamId)
      const expected = [
        Pair.reconstruct(PairId.reconstruct("id-pair-a"), {
          name: PairName.reconstruct("a"),
          teamId: TeamId.reconstruct("id-team-1"),
          participantIdList: [
            ParticipantId.reconstruct("id-user-01"),
            ParticipantId.reconstruct("id-user-02"),
            ParticipantId.reconstruct("id-user-03"),
          ],
        }),
      ]
      expect(actual).toStrictEqual(expected)
    })
  })

  describe(`getVacantPairList()`, () => {
    it(`空きのあるペアのリストを返す`, async () => {
      const actual = await pairRepository.getVacantPairList()
      const expected = [
        Pair.reconstruct(PairId.reconstruct("id-pair-b"), {
          name: PairName.reconstruct("b"),
          teamId: TeamId.reconstruct("id-team-2"),
          participantIdList: [
            ParticipantId.reconstruct("id-user-04"),
            ParticipantId.reconstruct("id-user-05"),
          ],
        }),
      ]
      // HELP: いろいろなプロパティがあってテスト結果が見づらいのでlength飲みを確認するテストを追加したが、もっと良い方法はあるか？
      expect(actual.length).toBe(1)
      expect(actual).toStrictEqual(expected)
    })
  })
})
