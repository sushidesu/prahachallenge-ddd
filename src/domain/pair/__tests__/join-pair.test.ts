import { JoinPair } from "../join-pair"
import { IPairRepository } from "../interface/pair-repository"
import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { ParticipantId } from "../../participant/participant-id"
import { PairName } from "../pair-name"
import { Participant } from "../../participant/participant"
import { ParticipantName } from "../../participant/participant-name"
import { Email } from "../../participant/email"
import { PairFactory } from "../pair-factory"

describe("JoinPair", () => {
  const pairRepositoryMock: jest.Mocked<IPairRepository> = {
    save: jest.fn(),
    getVacantPairList: jest.fn(),
    getAllPairList: jest.fn(),
  }
  const pairFactoryMock: jest.Mocked<PairFactory> = {
    // @ts-expect-error _brand
    _brand: undefined,
    create: jest.fn(),
  }
  afterEach(() => {
    jest.resetAllMocks()
  })

  const participant = Participant.reconstruct(
    ParticipantId.reconstruct("ex_albio"),
    {
      name: ParticipantName.reconstruct("エクス・アルビオ"),
      email: Email.reconstruct("ex_albio@example.com"),
    }
  )
  const participant_a = ParticipantId.reconstruct("participant-a")
  const participant_b = ParticipantId.reconstruct("participant-b")
  const participant_c = ParticipantId.reconstruct("participant-c")
  const participant_d = ParticipantId.reconstruct("participant-d")

  let joinPair: JoinPair
  beforeEach(() => {
    joinPair = new JoinPair(pairRepositoryMock, pairFactoryMock)
  })

  describe("空きのあるペアが存在する場合、そのペアに加入する", () => {
    it("2名のペアが2つ存在するとき、どちらか片方に加入する", async () => {
      const pairA = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b],
      })
      const pairB = Pair.reconstruct(PairId.reconstruct("b"), {
        name: PairName.reconstruct("b"),
        participantIdList: [participant_c, participant_d],
      })
      pairRepositoryMock.getVacantPairList.mockResolvedValue([pairA, pairB])

      const expected = {
        changedPairList: [
          Pair.reconstruct(PairId.reconstruct("a"), {
            name: PairName.reconstruct("a"),
            participantIdList: [participant_a, participant_b, participant.id],
          }),
        ],
      }
      expect(await joinPair.do(participant)).toStrictEqual(expected)
    })
  })
  describe("全てのペアに空きがない場合、ペアを分割する", () => {
    it("3名のペアが1つ存在するとき、ペアを2つに分割し、加入する", async () => {
      pairRepositoryMock.getVacantPairList.mockResolvedValue([])
      pairRepositoryMock.getAllPairList.mockResolvedValue([
        Pair.reconstruct(PairId.reconstruct("a"), {
          name: PairName.reconstruct("a"),
          participantIdList: [participant_a, participant_b, participant_c],
        }),
      ])
      pairFactoryMock.create.mockImplementation(
        (props: { name: string; participantIdList: ParticipantId[] }) =>
          Pair.reconstruct(PairId.reconstruct("b"), {
            name: PairName.reconstruct(props.name),
            participantIdList: props.participantIdList,
          })
      )
      const expected = {
        changedPairList: [
          Pair.reconstruct(PairId.reconstruct("a"), {
            name: PairName.reconstruct("a"),
            participantIdList: [participant_a, participant_b],
          }),
          Pair.reconstruct(PairId.reconstruct("b"), {
            name: PairName.reconstruct("b"),
            participantIdList: [participant_c, participant.id],
          }),
        ],
      }
      const actual = await joinPair.do(participant)
      expect(actual).toStrictEqual(expected)
    })
  })
  it("ペアが1つも存在しない場合、エラーになる", async () => {
    pairRepositoryMock.getVacantPairList.mockResolvedValue([])
    pairRepositoryMock.getAllPairList.mockResolvedValue([])
    await expect(joinPair.do(participant)).rejects.toThrowError(
      "no pair exists"
    )
  })
})
