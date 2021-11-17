import { DomainService } from "../../shared/domainService"
import { PairId } from "../../pair/pair-id"

export class GetParticipantCountInPairs extends DomainService<"get-participant-count-in-pairs"> {
  constructor() {
    super()
  }

  async do(pairs: readonly PairId[]): Promise<number> {
    console.log(pairs)
    return 0
  }
}
