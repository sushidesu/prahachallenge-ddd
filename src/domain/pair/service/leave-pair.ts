import { Participant } from "../../participant/participant"
import { DomainService } from "../../shared/domainService"
import { Team } from "../../team/team"
import { Pair } from "../pair"

export class LeavePair extends DomainService<"leave-pair"> {
  constructor() {
    super()
  }

  /**
   * ペアから参加者を脱退させる
   *
   * ペアが存続不可能な場合、残りの参加者を空きのあるペアに加入させる
   */
  async do(participant: Participant): Promise<{
    changedPairList: Pair[]
    changedTeamList: Team[]
  }> {
    // TODO:
    participant

    return {
      changedPairList: [],
      changedTeamList: [],
    }
  }
}
