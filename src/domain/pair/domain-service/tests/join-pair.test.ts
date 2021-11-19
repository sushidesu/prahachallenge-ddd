import { mock } from "jest-mock-extended"
import { JoinPair } from "../join-pair"
import {
  participant_id_values,
  genParticipant,
  genPair,
} from "../../../util/entity-generator-for-test"
// entity
import { TeamId } from "../../../team/team-id"
import { Team } from "../../../team/team"
import { TeamName } from "../../../team/team-name"
import { Pair } from "../../pair"
import { PairId } from "../../pair-id"
import { PairName } from "../../pair-name"
// repository
import { IPairRepository } from "../../interface/pair-repository"
// domain service
import { PairFactory } from "../../pair-factory"
import { GetVacantPairList } from "../get-vacant-pair-list"
import { GetParentTeam } from "../get-parent-team"
import { GeneratePairName } from "../generate-pair-name"

describe("JoinPair", () => {
  const pairRepositoryMock = mock<IPairRepository>()
  const pairFactoryMock = mock<PairFactory>()
  const getVacantPairListMock = mock<GetVacantPairList>()
  const getParentTeamMock = mock<GetParentTeam>()
  const generatePairNameMock = mock<GeneratePairName>()
  afterEach(() => {
    jest.resetAllMocks()
  })

  const ex_albio = genParticipant("ex_albio")
  const { p_01, p_02, p_03, p_04 } = participant_id_values

  let joinPair: JoinPair
  beforeEach(() => {
    joinPair = new JoinPair(
      pairRepositoryMock,
      pairFactoryMock,
      getVacantPairListMock,
      getParentTeamMock,
      generatePairNameMock
    )
  })

  describe("空きのあるペアが存在する場合、そのペアに加入する", () => {
    it("2名のペアが2つ存在するとき、どちらか片方に加入する", async () => {
      const pair_a = genPair("a", [p_01, p_02])
      const pair_b = genPair("b", [p_03, p_04])
      // 空きのあるペアを2つ返す
      getVacantPairListMock.do.mockResolvedValue([pair_a, pair_b])

      const expected = {
        createdPairList: [],
        changedPairList: [genPair("a", [p_01, p_02, ex_albio.id])],
      }
      expect(await joinPair.do(ex_albio)).toStrictEqual(expected)
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
          participantIdList: [p_01, p_02, p_03],
        }),
      ])
      // 新たにペアbを作成する
      pairFactoryMock.create.mockImplementation(({ participantIdList }) =>
        Pair.reconstruct(PairId.reconstruct("b"), {
          name: PairName.reconstruct("b"),
          participantIdList: participantIdList,
        })
      )
      generatePairNameMock.generate.mockResolvedValue(PairName.reconstruct("b"))
      // get-parent-teamは3名のペアが所属しているチームを返す
      getParentTeamMock.do.mockResolvedValue(
        Team.reconstruct(TeamId.reconstruct("1"), {
          name: TeamName.reconstruct("1"),
          pairIdList: [PairId.reconstruct("a")],
        })
      )
      // pair-aが変更され、pair-bが新たに作成される
      const expected = {
        createdPairList: [
          Pair.reconstruct(PairId.reconstruct("b"), {
            name: PairName.reconstruct("b"),
            participantIdList: [p_03, ex_albio.id],
          }),
        ],
        changedPairList: [
          Pair.reconstruct(PairId.reconstruct("a"), {
            name: PairName.reconstruct("a"),
            participantIdList: [p_01, p_02],
          }),
        ],
      }
      const actual = await joinPair.do(ex_albio)
      expect(actual).toStrictEqual(expected)
    })
  })
  it("ペアが1つも存在しない場合、エラーになる", async () => {
    getVacantPairListMock.do.mockResolvedValue([])
    pairRepositoryMock.getAllPairList.mockResolvedValue([])
    await expect(joinPair.do(ex_albio)).rejects.toThrowError("no pair exists")
  })
})
