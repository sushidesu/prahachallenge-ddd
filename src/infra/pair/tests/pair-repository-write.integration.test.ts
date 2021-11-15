import { createContext } from "../../shared/context"
import { PairRepository } from "../pair-repository"
import { generatePair, generateUser } from "../../util/db-value-generator"
import { truncateAllTables } from "../../util/truncate-all-tables"
import { Pair } from "../../../domain/pair/pair"
import { PairId } from "../../../domain/pair/pair-id"
import { PairName } from "../../../domain/pair/pair-name"
import { ParticipantId } from "../../../domain/participant/participant-id"

describe(`PairRepository (write)`, () => {
  const context = createContext()

  beforeAll(async () => {
    await Promise.all([
      // for test insert()
      context.prisma.user.createMany({
        data: [generateUser("insert-01"), generateUser("insert-02")],
      }),
      // for test update()
      context.prisma.pair.create({
        data: generatePair("update-name"),
      }),
      // for test update()
      context.prisma.pair.create({
        data: {
          ...generatePair("update-users"),
          users: {
            create: [generateUser("01"), generateUser("02")],
          },
        },
      }),
      context.prisma.user.createMany({
        data: [generateUser("03"), generateUser("04")],
      }),
    ])
  })

  afterAll(async () => {
    await truncateAllTables(context)
    await context.prisma.$disconnect()
  })

  let pairRepository: PairRepository
  beforeEach(() => {
    pairRepository = new PairRepository(context)
  })

  describe(`insert()`, () => {
    it(`チームを追加できる`, async () => {
      const pair = Pair.reconstruct(PairId.reconstruct("id-pair-insert"), {
        name: PairName.reconstruct("pair-insert"),
        participantIdList: [
          ParticipantId.reconstruct("id-user-insert-01"),
          ParticipantId.reconstruct("id-user-insert-02"),
        ],
      })
      await pairRepository.insert(pair)

      const result = await context.prisma.pair.findUnique({
        where: {
          id: "id-pair-insert",
        },
        include: {
          users: {
            select: {
              id: true,
            },
          },
        },
      })
      const expected = {
        id: "id-pair-insert",
        name: "pair-insert",
        users: [{ id: "id-user-insert-01" }, { id: "id-user-insert-02" }],
      }
      expect(result).toStrictEqual(expected)
    })
  })

  describe(`update()`, () => {
    it(`名前を更新できる`, async () => {
      const pair = Pair.reconstruct(PairId.reconstruct("id-pair-update-name"), {
        name: PairName.reconstruct("UPDATED"),
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
            orderBy: {
              id: "asc",
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
