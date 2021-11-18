import { CreateParticipantInputData } from "./create-participant-input-data"
import { ParticipantFactory } from "../../../domain/participant/participant-factory"
import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"

/**
 * 参加者の作成
 */
export class CreateParticipantUsecase {
  constructor(
    private participantRepository: IParticipantRepository,
    private participantFactory: ParticipantFactory
  ) {}
  async exec(inputData: CreateParticipantInputData): Promise<void> {
    const { name, email } = inputData.props
    // 参加者エンティティを生成
    const participant = await this.participantFactory.create({ name, email })
    // 保存
    await this.participantRepository.insert(participant)
  }
}
