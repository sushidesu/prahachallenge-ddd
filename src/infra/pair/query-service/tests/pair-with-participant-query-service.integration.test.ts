import { PairWithParticipantQueryService } from "../pair-with-participant-query-service"
import { PairWithParticipantQueryCommand } from "../../../../usecase/pair/get-pair-list/interface/pair-with-participant-query-command"
import { PairWithParticipantDTO } from "../../../../usecase/pair/get-pair-list/interface/pair-with-participant-DTO"

describe(`PairWithParticipantQueryService`, () => {
  let pairWithParticipantQueryService: PairWithParticipantQueryService
  beforeEach(() => {
    pairWithParticipantQueryService = new PairWithParticipantQueryService()
  })

  it(`ペアの一覧を取得する`, async () => {
    const command = new PairWithParticipantQueryCommand()
    const expected: PairWithParticipantDTO[] = [
      new PairWithParticipantDTO({
        id: "id-pair-a",
        name: "a",
        participants: [
          { id: "id-participant-01", name: "01" },
          { id: "id-participant-02", name: "02" },
          { id: "id-participant-03", name: "03" },
        ],
      }),
      new PairWithParticipantDTO({
        id: "id-pair-b",
        name: "b",
        participants: [
          { id: "id-participant-04", name: "04" },
          { id: "id-participant-05", name: "05" },
        ],
      }),
    ]
    const actual = await pairWithParticipantQueryService.query(command)
    expect(actual).toEqual(expected)
  })
})
