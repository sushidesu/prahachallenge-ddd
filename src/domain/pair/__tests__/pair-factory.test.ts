import { ParticipantId } from "../../participant/participant-id"
import { Pair } from "../pair"
import { PairFactory } from "../pair-factory"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"

describe(`PairFactory`, () => {
  let pairFactory: PairFactory
  beforeEach(() => {
    pairFactory = new PairFactory()
  })

  it(`ペアを作成できる`, async () => {
    const actual = await pairFactory.create({
      name: "a",
      participantIdList: [
        ParticipantId.reconstruct("participant-a"),
        ParticipantId.reconstruct("participant-b"),
      ],
    })
    const expected = Pair.reconstruct(expect.any(PairId), {
      name: PairName.reconstruct("a"),
      participantIdList: [
        ParticipantId.reconstruct("participant-a"),
        ParticipantId.reconstruct("participant-b"),
      ],
    })

    expect(actual).toStrictEqual(expected)
  })
})
