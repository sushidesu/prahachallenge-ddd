import { DomainService } from "../shared/domainService"
import { Participant } from "../participant/participant"
import { Pair } from "./pair"
import { PairFactory } from "./pair-factory"
import { GetVacantPairList } from "./get-vacant-pair-list"
import { IPairRepository } from "./interface/pair-repository"
import { GetParentTeam } from "./get-parent-team"
import { Team } from "../team/team"

export class JoinPair extends DomainService<"join-pair"> {
  constructor(
    private pairRepository: IPairRepository,
    private pairFactory: PairFactory,
    private getVacantPairList: GetVacantPairList,
    private getParentTeam: GetParentTeam
  ) {
    super()
  }

  async do(participant: Participant): Promise<{
    createdPairList: Pair[]
    changedPairList: Pair[]
    changedTeamList: Team[]
  }> {
    // 空きのあるペアを探す
    const vacantPairs = await this.getVacantPairList.do()

    // 空きがある場合、そのペアに加入する
    // そのペアが所属しているチームにも加入する
    if (vacantPairs.length) {
      const targetPair = vacantPairs[0]
      const targetTeam = await this.getParentTeam.do(targetPair)
      if (!targetTeam) {
        throw new Error(
          `pair: ${targetPair.id} はどのチームにも所属していません`
        )
      }
      // 加入
      targetPair.acceptParticipant(participant.id)
      targetTeam.acceptParticipant(participant.id)
      return {
        createdPairList: [],
        changedPairList: [targetPair],
        changedTeamList: [targetTeam],
      }
    }
    // ない場合、3人のペアを分解し、新規参加者を含む2-2のペアを作成
    // 加入するペアと同じチームにも加入する
    else {
      // ターゲットとなるペアを取得
      const pairs = await this.pairRepository.getAllPairList()
      if (!pairs.length) throw new Error("no pair exists")

      // 分割対象のペア
      const targetPair = pairs[0]
      const targetTeam = await this.getParentTeam.do(targetPair)
      if (!targetTeam) {
        throw new Error(
          `pair: ${targetPair.id} はどのチームにも所属していません`
        )
      }

      // ターゲットのペアから1人脱退
      const { removedParticipantId } = targetPair.removeParticipant()
      // もう一つペアを作成 (同じチームにする)
      const newPair = await this.pairFactory.create({
        teamId: targetTeam.id,
        participantIdList: [removedParticipantId, participant.id],
      })
      // チームに加入する
      targetTeam.acceptParticipant(participant.id)

      return {
        createdPairList: [newPair],
        changedPairList: [targetPair],
        changedTeamList: [targetTeam],
      }
    }
  }
}
