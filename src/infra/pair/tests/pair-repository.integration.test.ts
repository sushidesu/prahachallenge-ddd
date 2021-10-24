import { createContext } from "../../shared/context"
import { PairRepository } from "../pair-repository"
import { Pair } from "../../../domain/pair/pair"
import { PairId } from "../../../domain/pair/pair-id"
import { PairName } from "../../../domain/pair/pair-name"
import { TeamId } from "../../../domain/team/team-id"
import { ParticipantId } from "../../../domain/participant/participant-id"

describe(`PairRepository`, () => {
  const context = createContext()

  let pairRepository: PairRepository
  beforeEach(() => {
    pairRepository = new PairRepository(context)
  })

  beforeAll(async () => {
    await context.prisma.pair.create({
      data: {
        id: "id-pair-a",
        name: "a",
        teams: {
          create: {
            id: "id-team-1",
            name: "1",
          },
        },
        users: {
          create: [
            {
              id: "01",
              name: "01",
              email: "01@example.com",
            },
            {
              id: "02",
              name: "02",
              email: "02@example.com",
            },
            {
              id: "03",
              name: "03",
              email: "03@example.com",
            },
          ],
        },
      },
    })
    await context.prisma.pair.create({
      data: {
        id: "id-pair-b",
        name: "b",
        teams: {
          create: {
            id: "id-team-2",
            name: "2",
          },
        },
        users: {
          create: [
            {
              id: "04",
              name: "04",
              email: "04@example.com",
            },
            {
              id: "05",
              name: "05",
              email: "05@example.com",
            },
          ],
        },
      },
    })
  })

  afterAll(async () => {
    await context.prisma.pair.deleteMany()
    await context.prisma.$disconnect()
  })

  describe(`getAllPairList()`, () => {
    it(`ペアのリストを返す`, async () => {
      const actual = await pairRepository.getAllPairList()
      const expected = [
        Pair.reconstruct(PairId.reconstruct("id-pair-a"), {
          name: PairName.reconstruct("a"),
          teamId: TeamId.reconstruct("id-team-1"),
          participantIdList: [
            ParticipantId.reconstruct("01"),
            ParticipantId.reconstruct("02"),
            ParticipantId.reconstruct("03"),
          ],
        }),
        Pair.reconstruct(PairId.reconstruct("id-pair-b"), {
          name: PairName.reconstruct("b"),
          teamId: TeamId.reconstruct("id-team-2"),
          participantIdList: [
            ParticipantId.reconstruct("04"),
            ParticipantId.reconstruct("05"),
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
            ParticipantId.reconstruct("01"),
            ParticipantId.reconstruct("02"),
            ParticipantId.reconstruct("03"),
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
            ParticipantId.reconstruct("04"),
            ParticipantId.reconstruct("05"),
          ],
        }),
      ]
      // HELP: いろいろなプロパティがあってテスト結果が見づらいのでlength飲みを確認するテストを追加したが、もっと良い方法はあるか？
      expect(actual.length).toBe(1)
      expect(actual).toStrictEqual(expected)
    })
  })
})
