import { Team } from "../team"

export interface ITeamRepository {
  getAllTeamList(options?: { sort?: "name" }): Promise<Team[]>
}
