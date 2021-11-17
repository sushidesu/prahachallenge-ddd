import { mock } from "jest-mock-extended"
import { GetParticipantCountInPairs } from "../get-participant-count-in-pairs"
import { IPairRepository } from "../../interface/pair-repository"
import { Pair } from "../../pair"
import { PairId } from "../../pair-id"
import { PairName } from "../../pair-name"
import { ParticipantId } from "../../../participant/participant-id"

describe(`GetParticipantCountInPairs`, () => {
  const pairRepositoryMock = mock<IPairRepository>()
  afterEach(() => {
    jest.restoreAllMocks()
  })

  let getParticipantCountInPairs: GetParticipantCountInPairs
  beforeEach(() => {
    getParticipantCountInPairs = new GetParticipantCountInPairs(
      pairRepositoryMock
    )
  })

  // 2人のペア
  const pair_id_a = PairId.reconstruct("a")
  // 3人のペア
  const pair_id_b = PairId.reconstruct("b")
  // 参加者
  const p_01 = ParticipantId.reconstruct("01")
  const p_02 = ParticipantId.reconstruct("02")
  const p_03 = ParticipantId.reconstruct("03")
  const p_04 = ParticipantId.reconstruct("04")
  const p_05 = ParticipantId.reconstruct("05")

  it(`ペアに含まれる参加者の人数の合計を返す`, async () => {
    // pair-aの場合は2人、pair-bの場合は3人のペアを返す
    pairRepositoryMock.getPairById.mockImplementation(async (id) => {
      switch (id.props.value) {
        case "a":
          return Pair.reconstruct(PairId.reconstruct("a"), {
            name: PairName.reconstruct("a"),
            participantIdList: [p_01, p_02],
          })
        case "b":
          return Pair.reconstruct(PairId.reconstruct("b"), {
            name: PairName.reconstruct("b"),
            participantIdList: [p_03, p_04, p_05],
          })
        default:
          return undefined
      }
    })
    const actual = await getParticipantCountInPairs.do([pair_id_a, pair_id_b])
    expect(actual).toBe(5)
  })

  it(`空のリストを渡すと0を返す`, async () => {
    const actual = await getParticipantCountInPairs.do([])
    expect(actual).toBe(0)
  })
})
