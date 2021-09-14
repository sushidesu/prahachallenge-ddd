import { DomainService } from "../shared/domainService"
import { Participant } from "../participant/participant"
import { Pair } from "./pair"

export class JoinPair extends DomainService<"join-pair"> {
  async do(participant: Participant): Promise<{
    changedPairList: Pair[]
  }> {
    console.log(participant)
    // TODO:
    // - 空きのあるペアを探す
    // - 空きがある場合、そのペアに加入する
    // - ない場合、3人のペアを分解し、新規参加者を含む2-2のペアを作成
    return {
      changedPairList: [],
    }
  }
}
