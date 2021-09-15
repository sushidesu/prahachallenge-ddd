import { DomainService } from "../shared/domainService"
import { Participant } from "../participant/participant"
import { Pair } from "./pair"
import { IPairRepository } from "./interface/pair-repository"

export class JoinPair extends DomainService<"join-pair"> {
  constructor(private pairRepository: IPairRepository) {
    super()
  }

  async do(participant: Participant): Promise<{
    changedPairList: Pair[]
  }> {
    // 空きのあるペアを探す
    const vacantPairs = await this.pairRepository.getVacantPairList()
    // 空きがある場合、そのペアに加入する
    // TODO: 加入するペアと同じチームにも加入する
    if (vacantPairs.length) {
      const targetPair = vacantPairs[0]
      targetPair.acceptParticipant(participant.id)
      return {
        changedPairList: [targetPair],
      }
    }
    // TODO: ない場合、3人のペアを分解し、新規参加者を含む2-2のペアを作成
    // TODO: 加入するペアと同じチームにも加入する
    else {
      return {
        changedPairList: [],
      }
    }
  }
}
