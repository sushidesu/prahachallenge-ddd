import { RecessPrahaChallengeInputData } from "./recess-praha-challenge-input-data"
import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"
import { ParticipantId } from "../../../domain/participant/participant-id"
import { LeavePair } from "../../../domain/pair/leave-pair"

export class RecessPrahaChallengeUsecase {
  constructor(
    private participantRepository: IParticipantRepository,
    private leavePair: LeavePair
  ) {}
  /**
   * 参加者の更新 (在籍ステータスの変更)
   *
   * `在籍中` から `休会中` に変更する
   */
  async exec(inputData: RecessPrahaChallengeInputData): Promise<void> {
    // 変更したい参加者を取得
    const id = ParticipantId.reconstruct(inputData.props.participantId) // HELP: idの生成これでよい？
    const participant = await this.participantRepository.getParticipantById(id)

    // ペアから抜ける
    const { changedPairList, changedTeamList } = await this.leavePair.do(
      participant
    )

    // 参加者 entity の在籍ステータスを変更
    participant.recess()

    // 参加者を保存
    await this.participantRepository.save(participant)
    // ペア・チームを保存
    await Promise.all(changedPairList.map())
    await Promise.all(changedTeamList.map())
  }
}
