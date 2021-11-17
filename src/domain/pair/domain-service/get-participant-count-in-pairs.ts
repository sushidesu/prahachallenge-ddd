import { DomainService } from "../../shared/domainService"
import { IPairRepository } from "../../pair/interface/pair-repository"
import { PairId } from "../pair-id"

export class GetParticipantCountInPairs extends DomainService<"get-participant-count-in-pairs"> {
  constructor(private readonly pairRepository: IPairRepository) {
    super()
  }

  async do(pairIdList: readonly PairId[]): Promise<number> {
    const result = await Promise.all(
      pairIdList.map((id) => {
        return this.pairRepository.getPairById(id)
      })
    )
    const numOfParticipants = result.reduce((prev, cur) => {
      if (cur === undefined) {
        return prev
      } else {
        return prev + cur.participantIdList.length
      }
    }, 0)
    return numOfParticipants
  }
}
