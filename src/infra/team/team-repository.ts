import { ITeamRepository } from "../../domain/team/interface/team-repository"
import { Team } from "../../domain/team/team"

export class TeamRepository implements ITeamRepository {
  async save(): Promise<void> {
    // TODO:
  }
  async getTeamById(): Promise<Team | undefined> {
    // TODO:
    return undefined
  }
  async getAllTeamList(): Promise<Team[]> {
    // TODO:
    return []
  }
}
