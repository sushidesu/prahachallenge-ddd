import { createContext } from "../../shared/context"
import { PairRepository } from "../pair-repository"
import { generatePair, generateUser } from "../../util/db-value-generator"

describe(`PairRepository (write)`, () => {
  const context = createContext()

  beforeAll(async () => {
    await context.prisma.pair.create({
      data: {
        ...generatePair("a"),
        users: {
          create: [generateUser("01"), generateUser("02"), generateUser("03")],
        },
      },
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
    it(`更新できる`, () => {
      // TODO:
      pairRepository
    })
  })
})
