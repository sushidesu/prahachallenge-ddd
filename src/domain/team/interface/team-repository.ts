import { Team } from "../team"
import { TeamId } from "../team-id"

export interface ITeamRepository {
  getTeamById(id: TeamId): Promise<Team | undefined>
  getAllTeamList(options?: { sort?: "name" }): Promise<Team[]>
}
