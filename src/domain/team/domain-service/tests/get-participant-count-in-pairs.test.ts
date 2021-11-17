import { GetParticipantCountInPairs } from "../get-participant-count-in-pairs"
import { PairId } from "../../../pair/pair-id"

describe(`GetParticipantCountInPairs`, () => {
  let getParticipantCountInPairs: GetParticipantCountInPairs
  beforeEach(() => {
    getParticipantCountInPairs = new GetParticipantCountInPairs()
  })

  // 2人のペア
  const pair_id_a = PairId.reconstruct("a")
  // 3人のペア
  const pair_id_b = PairId.reconstruct("b")

  it(`ペアに含まれる参加者の人数の合計を返す`, async () => {
    const actual = await getParticipantCountInPairs.do([pair_id_a, pair_id_b])
    expect(actual).toBe(5)
  })
  it(`空のリストを渡すと0を返す`, async () => {
    const actual = await getParticipantCountInPairs.do([pair_id_a, pair_id_b])
    expect(actual).toBe(0)
  })
})
