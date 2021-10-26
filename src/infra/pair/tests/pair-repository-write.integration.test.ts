import { createContext } from "../../shared/context"
import { PairRepository } from "../pair-repository"
import { generatePair } from "../../util/db-value-generator"
import { Pair } from "../../../domain/pair/pair"
import { PairId } from "../../../domain/pair/pair-id"
import { PairName } from "../../../domain/pair/pair-name"
import { TeamId } from "../../../domain/team/team-id"

describe(`PairRepository (write)`, () => {
  const context = createContext()

  beforeAll(async () => {
    await context.prisma.pair.create({
      data: generatePair("update-name"),
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
  })
})
