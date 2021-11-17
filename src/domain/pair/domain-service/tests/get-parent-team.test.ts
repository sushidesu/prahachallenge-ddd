import { mock } from "jest-mock-extended"
import { GetParentTeam } from "../get-parent-team"
import { Team } from "../../../team/team"
import { TeamId } from "../../../team/team-id"
import { TeamName } from "../../../team/team-name"
import { Pair } from "../../pair"
import { PairId } from "../../pair-id"
import { PairName } from "../../pair-name"
import { ITeamRepository } from "../../../team/interface/team-repository"

describe(`GetParentTeam`, () => {
  const teamRepositoryMock = mock<ITeamRepository>()
  afterEach(() => {
    jest.resetAllMocks()
  })

  let getParentTeam: GetParentTeam
  beforeEach(() => {
    getParentTeam = new GetParentTeam(teamRepositoryMock)
  })

  const pair = Pair.reconstruct(PairId.reconstruct("a"), {
    name: PairName.reconstruct("a"),
    participantIdList: [],
  })

  it(`親のチームを取得する`, async () => {
    // arrange
    teamRepositoryMock.getTeamByPair.mockResolvedValue(
      Team.reconstruct(TeamId.reconstruct("1"), {
        name: TeamName.reconstruct("1"),
        pairIdList: [],
        participantIdList: [],
      })
    )
    const expected = Team.reconstruct(TeamId.reconstruct("1"), {
      name: TeamName.reconstruct("1"),
      pairIdList: [],
      participantIdList: [],
    })
    // act
    const actual = await getParentTeam.do(pair)
    // assert
    expect(actual).toEqual(expected)
  })

  it(`親のチームがない場合、undefinedを返す`, async () => {
    // arrange
    teamRepositoryMock.getTeamByPair.mockResolvedValue(undefined)
    // act
    const actual = await getParentTeam.do(pair)
    // assert
    expect(actual).toBe(undefined)
  })
})
