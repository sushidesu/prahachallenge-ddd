import { JoinPrahaChallengeInputData } from "./join-praha-challenge-input-data"
import { ParticipantFactory } from "../../../domain/participant/participant-factory"
import { CheckEmailAlreadyExists } from "../../../domain/participant/check-email-already-exists"
import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"

export class JoinPrahaChallengeUsecase {
  constructor(private participantRepository: IParticipantRepository) {}
  /**
   * 参加者の新規追加
   */
  async exec(inputData: JoinPrahaChallengeInputData): Promise<void> {
    const checkEmailAlreadyExists = new CheckEmailAlreadyExists(
      this.participantRepository
    )
    const participantFactory = new ParticipantFactory(checkEmailAlreadyExists)
    // 参加者 entity を生成
    const { name, email } = inputData.props
    const participant = await participantFactory.create({
      name,
      email,
    })
    // TODO: 空きのあるペアに加入する (ドメインサービス?)
    //   - 空きのあるペアを探す
    //   - 空きがある場合、そのペアに加入する
    //   - ない場合
    //     - 3人のペアを分解し、新規参加者を含む2-2のペアを作成
    // 参加者・ペア・チーム entity を保存
    await this.participantRepository.saveParticipant(participant)
  }
}
