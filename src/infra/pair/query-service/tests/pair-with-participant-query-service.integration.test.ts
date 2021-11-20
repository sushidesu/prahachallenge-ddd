import { createContext } from "../../../shared/context"
import { truncateAllTables } from "../../../util/truncate-all-tables"
import { generatePair, generateUser } from "../../../util/db-value-generator"
import { PairWithParticipantQueryService } from "../pair-with-participant-query-service"
import { PairWithParticipantQueryCommand } from "../../../../usecase/pair/get-pair-list/interface/pair-with-participant-query-command"
import { PairWithParticipantDTO } from "../../../../usecase/pair/get-pair-list/interface/pair-with-participant-DTO"

describe(`PairWithParticipantQueryService`, () => {
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
    await context.prisma.pair.create({
      data: {
        ...generatePair("b"),
        users: {
          create: [generateUser("04"), generateUser("05")],
        },
      },
    })
  })
  afterAll(async () => {
    await truncateAllTables(context)
    await context.prisma.$disconnect()
  })

  let pairWithParticipantQueryService: PairWithParticipantQueryService
  beforeEach(() => {
    pairWithParticipantQueryService = new PairWithParticipantQueryService(
      context
    )
  })

  it(`ペアの一覧を取得する`, async () => {
    const command = new PairWithParticipantQueryCommand()
    const expected: PairWithParticipantDTO[] = [
      new PairWithParticipantDTO({
        id: "id-pair-a",
        name: "a",
        participants: [
          { id: "id-user-01", name: "01" },
          { id: "id-user-02", name: "02" },
          { id: "id-user-03", name: "03" },
        ],
      }),
      new PairWithParticipantDTO({
        id: "id-pair-b",
        name: "b",
        participants: [
          { id: "id-user-04", name: "04" },
          { id: "id-user-05", name: "05" },
        ],
      }),
    ]
    const actual = await pairWithParticipantQueryService.query(command)
    expect(actual).toEqual(expected)
  })
})
