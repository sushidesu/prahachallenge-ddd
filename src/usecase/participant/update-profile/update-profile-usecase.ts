import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"
import { ParticipantId } from "../../../domain/participant/participant-id"
import { UpdateProfileInputData } from "./update-profile-input-data"
import { CheckEmailAlreadyExists } from "../../../domain/participant/check-email-already-exists"

export class UpdateProfileUsecase {
  constructor(
    private participantRepository: IParticipantRepository,
    private checkEmailAlreadyExists: CheckEmailAlreadyExists
  ) {}
  /**
   * 参加者の更新 (名前・メールアドレスの更新)
   */
  async exec(inputData: UpdateProfileInputData): Promise<void> {
    const { id } = inputData.props
    const participantId = ParticipantId.reconstruct(id)
    // - 参加者 entity の取得
    const participant = await this.participantRepository.getParticipantById(
      participantId
    )
    // - 参加者 entity の 名前・メールアドレスを更新
    const { name, email } = inputData.props
    if (name) {
      participant.changeName(name)
    }
    if (email) {
      await participant.changeEmail(email, this.checkEmailAlreadyExists)
    }
    // - 参加者 entity を保存
    await this.participantRepository.save(participant)
  }
}
