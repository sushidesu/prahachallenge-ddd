import { DomainService } from "../shared/domainService"
import { Participant } from "../participant/participant"
import { Pair } from "./pair"
import { PairFactory } from "./pair-factory"
import { IPairRepository } from "./interface/pair-repository"
import { Team } from "../team/team"

export class JoinPair extends DomainService<"join-pair"> {
  constructor(
    private pairRepository: IPairRepository,
    private pairFactory: PairFactory
  ) {
    super()
  }

  async do(participant: Participant): Promise<{
    changedPairList: Pair[]
    changedTeamList: Team[]
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
        changedTeamList: [],
      }
    }
    // ない場合、3人のペアを分解し、新規参加者を含む2-2のペアを作成
    // TODO: 加入するペアと同じチームにも加入する
    else {
      // ターゲットとなるペアを取得
      const pairs = await this.pairRepository.getAllPairList()
      if (!pairs.length) throw new Error("no pair exists")
      const targetPair = pairs[0]
      // ターゲットのペアから1人脱退
      const { removedParticipantId } = targetPair.removeParticipant()
      // もう一つペアを作成
      // TODO: 名前はチーム内でかぶらないようにしたいので、factoryを修正する
      const newPair = this.pairFactory.create({
        name: "b",
        participantIdList: [removedParticipantId, participant.id],
      }) // HELP: ID直接渡すでいいか？
      return {
        changedPairList: [targetPair, newPair],
        changedTeamList: [],
      }
    }
  }
}
