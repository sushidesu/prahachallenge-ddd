import { mock } from "jest-mock-extended"
import { GetVacantPairList } from "../get-vacant-pair-list"
import { IPairRepository } from "../interface/pair-repository"
import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"
import { ParticipantId } from "../../participant/participant-id"
import { TeamId } from "../../team/team-id"

describe(`GetVacantPairList`, () => {
  const pairRepositoryMock = mock<IPairRepository>()
  afterEach(() => {
    jest.resetAllMocks()
  })

  let getVacantPairList: GetVacantPairList
  beforeEach(() => {
    getVacantPairList = new GetVacantPairList(pairRepositoryMock)
  })

  const pairA_vacant = Pair.reconstruct(PairId.reconstruct("a"), {
    name: PairName.reconstruct("a"),
    teamId: TeamId.reconstruct("1"),
    participantIdList: [
      ParticipantId.reconstruct("01"),
      ParticipantId.reconstruct("02"),
    ],
  })
  const pairB_full = Pair.reconstruct(PairId.reconstruct("b"), {
    name: PairName.reconstruct("b"),
    teamId: TeamId.reconstruct("1"),
    participantIdList: [
      ParticipantId.reconstruct("03"),
      ParticipantId.reconstruct("04"),
      ParticipantId.reconstruct("05"),
    ],
  })
  const pairC_vacant = Pair.reconstruct(PairId.reconstruct("c"), {
    name: PairName.reconstruct("c"),
    teamId: TeamId.reconstruct("1"),
    participantIdList: [
      ParticipantId.reconstruct("06"),
      ParticipantId.reconstruct("07"),
    ],
  })

  it(`空きのあるペアを返す`, async () => {
    pairRepositoryMock.getAllPairList.mockResolvedValue([
      pairA_vacant,
      pairB_full,
      pairC_vacant,
    ])
    const actual = await getVacantPairList.do()
    const expected = [pairA_vacant, pairC_vacant]
    expect(actual).toStrictEqual(expected)
  })

  it(`空きのあるペアがない場合、空のリストを返す`, async () => {
    pairRepositoryMock.getAllPairList.mockResolvedValue([pairB_full])
    const actual = await getVacantPairList.do()
    expect(actual).toEqual([])
  })
})
