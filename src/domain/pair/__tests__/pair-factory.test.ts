import { mock } from "jest-mock-extended"
import { ParticipantId } from "../../participant/participant-id"
import { TeamId } from "../../team/team-id"
import { Pair } from "../pair"
import { PairFactory } from "../pair-factory"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"
import { PairNameFactory } from "../pair-name-factory"

describe(`PairFactory`, () => {
  const pairNameFactoryMock = mock<PairNameFactory>()
  afterEach(() => {
    jest.resetAllMocks()
  })

  let pairFactory: PairFactory
  beforeEach(() => {
    pairFactory = new PairFactory(pairNameFactoryMock)
  })

  it(`ペアを作成できる`, async () => {
    pairNameFactoryMock.create.mockResolvedValue(PairName.reconstruct("a"))

    const actual = await pairFactory.create({
      teamId: TeamId.reconstruct("1"),
      participantIdList: [
        ParticipantId.reconstruct("participant-a"),
        ParticipantId.reconstruct("participant-b"),
      ],
    })
    const expected = Pair.reconstruct(expect.any(PairId), {
      name: PairName.reconstruct("a"),
      teamId: TeamId.reconstruct("1"),
      participantIdList: [
        ParticipantId.reconstruct("participant-a"),
        ParticipantId.reconstruct("participant-b"),
      ],
    })

    expect(actual).toStrictEqual(expected)
  })
})
