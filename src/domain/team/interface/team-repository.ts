import { Team } from "../team"
import { TeamId } from "../team-id"

export interface ITeamRepository {
  insert(team: Team): Promise<void>
  update(team: Team): Promise<void>
  getTeamById(id: TeamId): Promise<Team | undefined>
  getAllTeamList(options?: { sort?: "name" }): Promise<Team[]>
}
