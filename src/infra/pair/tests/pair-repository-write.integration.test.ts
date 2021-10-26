import { createContext } from "../../shared/context"
import { PairRepository } from "../pair-repository"
import { generatePair, generateUser } from "../../util/db-value-generator"
import { Pair } from "../../../domain/pair/pair"
import { PairId } from "../../../domain/pair/pair-id"
import { PairName } from "../../../domain/pair/pair-name"
import { TeamId } from "../../../domain/team/team-id"
import { ParticipantId } from "../../../domain/participant/participant-id"

describe(`PairRepository (write)`, () => {
  const context = createContext()

  beforeAll(async () => {
    await context.prisma.pair.create({
      data: generatePair("update-name"),
    })
    await context.prisma.pair.create({
      data: {
        ...generatePair("update-users"),
        users: {
          create: [generateUser("01"), generateUser("02")],
        },
      },
    })
    await context.prisma.user.createMany({
      data: [generateUser("03"), generateUser("04")],
    })
  })
  afterAll(async () => {
    await context.prisma.team.deleteMany()
    await context.prisma.pair.deleteMany()
    await context.prisma.user.deleteMany()
    await context.prisma.$disconnect()
  })

  let pairRepository: PairRepository
  beforeEach(() => {
    pairRepository = new PairRepository(context)
  })

  describe(`update()`, () => {
    it(`名前を更新できる`, async () => {
      const pair = Pair.reconstruct(PairId.reconstruct("id-pair-update-name"), {
        name: PairName.reconstruct("UPDATED"),
        teamId: TeamId.reconstruct("id-team-1"),
        participantIdList: [],
      })
      await pairRepository.update(pair)
      const result = await context.prisma.pair.findUnique({
        where: {
          id: "id-pair-update-name",
        },
      })
      expect(result).toStrictEqual({
        id: "id-pair-update-name",
        name: "UPDATED",
      })
    })
    it(`ペアに所属する参加者を更新できる`, async () => {
      // [01, 02] -> [02, 03, 04] に更新
      const pair = Pair.reconstruct(
        PairId.reconstruct("id-pair-update-users"),
        {
          name: PairName.reconstruct("update-users"),
          teamId: TeamId.reconstruct("id-team-1"),
          participantIdList: [
            ParticipantId.reconstruct("id-user-02"),
            ParticipantId.reconstruct("id-user-03"),
            ParticipantId.reconstruct("id-user-04"),
          ],
        }
      )
      await pairRepository.update(pair)
      const result = await context.prisma.pair.findUnique({
        where: {
          id: "id-pair-update-users",
        },
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      })
      expect(result).toStrictEqual({
        users: [
          { id: "id-user-02" },
          { id: "id-user-03" },
          { id: "id-user-04" },
        ],
      })
    })
  })
})
