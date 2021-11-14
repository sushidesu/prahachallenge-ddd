import { DomainService } from "../shared/domainService"
import { Team } from "../team/team"

export class GetParentTeam extends DomainService<"get-parent-team"> {
  constructor() {
    super()
  }

  async do(): Promise<Team | undefined> {
    return undefined
  }
}
