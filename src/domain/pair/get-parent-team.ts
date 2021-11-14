import { DomainService } from "../shared/domainService"
import { Pair } from "./pair"
import { Team } from "../team/team"

export class GetParentTeam extends DomainService<"get-parent-team"> {
  constructor() {
    super()
  }

  async do(pair: Pair): Promise<Team | undefined> {
    console.log(pair)
    return undefined
  }
}
