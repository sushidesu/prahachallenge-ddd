import { DomainService } from "../shared/domainService"
import { Pair } from "./pair"
import { Team } from "../team/team"
import { ITeamRepository } from "../team/interface/team-repository"

export class GetParentTeam extends DomainService<"get-parent-team"> {
  constructor(private readonly teamRepository: ITeamRepository) {
    super()
  }

  async do(pair: Pair): Promise<Team | undefined> {
    return this.teamRepository.getTeamByPair(pair.id)
  }
}
