import { DomainService } from "../../shared/domainService"
import { Pair } from "../pair"
import { IPairRepository } from "../interface/pair-repository"

export class GetVacantPairList extends DomainService<"get-vacant-pair-list"> {
  constructor(private readonly pairRepository: IPairRepository) {
    super()
  }

  async do(): Promise<readonly Pair[]> {
    const allPairs = await this.pairRepository.getAllPairList()
    return allPairs.filter((pair) => pair.canAcceptParticipant())
  }
}
