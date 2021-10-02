import { RecessPrahaChallengeInputData } from "./recess-praha-challenge-input-data"
import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"
import { ParticipantId } from "../../../domain/participant/participant-id"

export class RecessPrahaChallengeUsecase {
  constructor(private participantRepository: IParticipantRepository) {}
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
    //   - 残りのペアが存続可能なら、そのまま
    //   - 存続不可能な場合、残りのペアのメンバーを、空きのあるペアに加入
    const { changedTeamList, changedPairList } = leavePair.do(participant)

    // 参加者 entity の在籍ステータスを変更
    participant.recess()

    // 参加者を保存
    await this.participantRepository.save(participant)
    // ペア・チームを保存
    await Promise.all(changedPairList.map())
    await Promise.all(changedTeamList.map())
  }
}
