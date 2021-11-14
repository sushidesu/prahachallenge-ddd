import { mock } from "jest-mock-extended"
import { JoinPair } from "../join-pair"
// entity
import { TeamId } from "../../team/team-id"
import { Team } from "../../team/team"
import { TeamName } from "../../team/team-name"
import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"
import { Participant } from "../../participant/participant"
import { ParticipantId } from "../../participant/participant-id"
import { ParticipantName } from "../../participant/participant-name"
import { Email } from "../../participant/email"
// repository
import { IPairRepository } from "../interface/pair-repository"
// domain service
import { PairFactory } from "../pair-factory"
import { GetVacantPairList } from "../get-vacant-pair-list"
import { GetParentTeam } from "../get-parent-team"

describe("JoinPair", () => {
  const pairRepositoryMock = mock<IPairRepository>()
  const pairFactoryMock = mock<PairFactory>()
  const getVacantPairListMock = mock<GetVacantPairList>()
  const getParentTeamMock = mock<GetParentTeam>()
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
    joinPair = new JoinPair(
      pairRepositoryMock,
      pairFactoryMock,
      getVacantPairListMock,
      getParentTeamMock
    )
  })

  describe("空きのあるペアが存在する場合、そのペアに加入する", () => {
    it("2名のペアが2つ存在するとき、どちらか片方に加入する", async () => {
      const pairA = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b],
        teamId: TeamId.reconstruct("1"),
      })
      const pairB = Pair.reconstruct(PairId.reconstruct("b"), {
        name: PairName.reconstruct("b"),
        participantIdList: [participant_c, participant_d],
        teamId: TeamId.reconstruct("1"),
      })
      // get-vacant-pair-listは2名のペア2つを返す
      getVacantPairListMock.do.mockResolvedValue([pairA, pairB])
      // get-parent-teamは2名のペア*2が所属しているチームを返す
      getParentTeamMock.do.mockResolvedValue(
        Team.reconstruct(TeamId.reconstruct("1"), {
          name: TeamName.reconstruct("1"),
          participantIdList: [
            participant_a,
            participant_b,
            participant_c,
            participant_d,
          ],
        })
      )

      const expected = {
        createdPairList: [],
        changedPairList: [
          Pair.reconstruct(PairId.reconstruct("a"), {
            name: PairName.reconstruct("a"),
            participantIdList: [participant_a, participant_b, participant.id],
            teamId: TeamId.reconstruct("1"),
          }),
        ],
        changedTeamList: [
          Team.reconstruct(TeamId.reconstruct("1"), {
            name: TeamName.reconstruct("1"),
            participantIdList: [
              participant_a,
              participant_b,
              participant_c,
              participant_d,
              participant.id,
            ],
          }),
        ],
      }
      expect(await joinPair.do(participant)).toStrictEqual(expected)
    })
  })
  describe("全てのペアに空きがない場合、ペアを分割する", () => {
    it("3名のペアが1つ存在するとき、ペアを2つに分割し、加入する", async () => {
      // 空きのあるペアなし
      getVacantPairListMock.do.mockResolvedValue([])
      // pair-repositoryは3名のペアを1つ返す
      pairRepositoryMock.getAllPairList.mockResolvedValue([
        Pair.reconstruct(PairId.reconstruct("a"), {
          name: PairName.reconstruct("a"),
          participantIdList: [participant_a, participant_b, participant_c],
          teamId: TeamId.reconstruct("1"),
        }),
      ])
      pairFactoryMock.create.mockImplementation(
        async ({ teamId, participantIdList }) =>
          Pair.reconstruct(PairId.reconstruct("b"), {
            name: PairName.reconstruct("b"),
            participantIdList: participantIdList,
            teamId,
          })
      )
      // get-parent-teamは3名のペアが所属しているチームを返す
      getParentTeamMock.do.mockResolvedValue(
        Team.reconstruct(TeamId.reconstruct("1"), {
          name: TeamName.reconstruct("1"),
          participantIdList: [participant_a, participant_b, participant_c],
        })
      )
      const expected = {
        createdPairList: [
          Pair.reconstruct(PairId.reconstruct("b"), {
            name: PairName.reconstruct("b"),
            participantIdList: [participant_c, participant.id],
            teamId: TeamId.reconstruct("1"),
          }),
        ],
        changedPairList: [
          Pair.reconstruct(PairId.reconstruct("a"), {
            name: PairName.reconstruct("a"),
            participantIdList: [participant_a, participant_b],
            teamId: TeamId.reconstruct("1"),
          }),
        ],
        changedTeamList: [
          Team.reconstruct(TeamId.reconstruct("1"), {
            name: TeamName.reconstruct("1"),
            participantIdList: [
              participant_a,
              participant_b,
              participant_c,
              participant.id,
            ],
          }),
        ],
      }
      const actual = await joinPair.do(participant)
      expect(actual).toStrictEqual(expected)
    })
  })
  it("ペアが1つも存在しない場合、エラーになる", async () => {
    getVacantPairListMock.do.mockResolvedValue([])
    pairRepositoryMock.getAllPairList.mockResolvedValue([])
    await expect(joinPair.do(participant)).rejects.toThrowError(
      "no pair exists"
    )
  })
})
