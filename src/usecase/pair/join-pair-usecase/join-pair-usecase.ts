import { JoinPairInputData } from "./join-pair-input-data"
import { ParticipantId } from "../../../domain/participant/participant-id"
import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"
import { IPairRepository } from "../../../domain/pair/interface/pair-repository"
import { JoinPair } from "../../../domain/pair/domain-service/join-pair"

export class JoinPairUsecase {
  constructor(
    private participantRepository: IParticipantRepository,
    private pairRepository: IPairRepository,
    private joinPair: JoinPair
  ) {}
  /**
   * 参加者がペアに加入する
   */
  async exec(inputData: JoinPairInputData): Promise<void> {
    // 参加者 entity を取得
    const { participantId } = inputData.props
    const participant = await this.participantRepository.getParticipantById(
      ParticipantId.reconstruct(participantId)
    )

    if (participant === undefined) {
      throw new Error(`id: ${participantId} の参加者が存在しません`)
    }

    // 空きのあるペアに加入する
    const { createdPairList, changedPairList } = await this.joinPair.do(
      participant
    )

    // 新規作成された参加者を追加
    await this.participantRepository.insert(participant)
    // 新規作成されたペアを追加
    await Promise.all(
      createdPairList.map((pair) => this.pairRepository.insert(pair))
    )
    // 変更のあったペアを保存
    await Promise.all(
      changedPairList.map((pair) => this.pairRepository.update(pair))
    )
  }
}
