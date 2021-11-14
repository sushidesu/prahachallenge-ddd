import { Team } from "../../team/team"
import { TeamId } from "../../team/team-id"
import { TeamName } from "../../team/team-name"
import { GetParentTeam } from "../get-parent-team"
import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"

describe(`GetParentTeam`, () => {
  let getParentTeam: GetParentTeam
  beforeEach(() => {
    getParentTeam = new GetParentTeam()
  })

  const pair = Pair.reconstruct(PairId.reconstruct("a"), {
    name: PairName.reconstruct("a"),
    teamId: TeamId.reconstruct("1"),
    participantIdList: [],
  })

  it(`親のチームを取得する`, async () => {
    const actual = getParentTeam.do(pair)
    const expected = Team.reconstruct(TeamId.reconstruct("1"), {
      name: TeamName.reconstruct("1"),
      participantIdList: [],
    })
    expect(actual).toEqual(expected)
  })

  it(`親のチームがない場合、undefinedを返す`, async () => {
    const actual = await getParentTeam.do(pair)
    expect(actual).toBe(undefined)
  })
})
