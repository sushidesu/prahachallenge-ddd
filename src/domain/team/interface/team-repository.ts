import { Team } from "../team"
import { TeamId } from "../team-id"

export interface ITeamRepository {
  save(team: Team): Promise<void>
  getTeamById(id: TeamId): Promise<Team | undefined>
  getAllTeamList(options?: { sort?: "name" }): Promise<Team[]>
}
