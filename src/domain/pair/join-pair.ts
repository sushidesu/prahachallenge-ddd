import { DomainService } from "../shared/domainService"
import { Participant } from "../participant/participant"
import { Pair } from "./pair"
import { PairFactory } from "./pair-factory"
import { IPairRepository } from "./interface/pair-repository"
import { Team } from "../team/team"
import { ITeamRepository } from "../team/interface/team-repository"

export class JoinPair extends DomainService<"join-pair"> {
  constructor(
    private pairRepository: IPairRepository,
    private teamRepository: ITeamRepository,
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
    // そのペアが所属しているチームにも加入する
    if (vacantPairs.length) {
      const targetPair = vacantPairs[0]
      const targetTeam = await this.teamRepository.getTeamById(
        targetPair.teamId
      )
      if (!targetTeam) {
        throw new Error()
      }
      targetPair.acceptParticipant(participant.id)
      targetTeam.acceptParticipant(participant.id)
      return {
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
      const targetPair = pairs[0]
      // ターゲットのペアから1人脱退
      const { removedParticipantId } = targetPair.removeParticipant()
      // もう一つペアを作成 (同じチームにする)
      const newPair = await this.pairFactory.create({
        teamId: targetPair.teamId,
        participantIdList: [removedParticipantId, participant.id],
      })
      // チームに加入する
      const targetTeam = await this.teamRepository.getTeamById(
        targetPair.teamId
      )
      if (!targetTeam) {
        throw new Error()
      }
      targetTeam.acceptParticipant(participant.id)
      return {
        changedPairList: [targetPair, newPair],
        changedTeamList: [targetTeam],
      }
    }
  }
}
