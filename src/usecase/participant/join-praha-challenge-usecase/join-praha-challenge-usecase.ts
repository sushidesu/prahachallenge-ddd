import { JoinPrahaChallengeInputData } from "./join-praha-challenge-input-data"
import { ParticipantFactory } from "../../../domain/participant/participant-factory"
import { CheckEmailAlreadyExists } from "../../../domain/participant/check-email-already-exists"
import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"
import { IPairRepository } from "../../../domain/pair/interface/pair-repository"
import { JoinPair } from "../../../domain/pair/join-pair"

export class JoinPrahaChallengeUsecase {
  constructor(
    private participantRepository: IParticipantRepository,
    private pairRepository: IPairRepository
  ) {}
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

    // 空きのあるペアに加入する
    const joinPair = new JoinPair()
    const { changedPairList } = await joinPair.do(participant)

    // 変更のあったペアを保存
    await Promise.all(
      changedPairList.map((pair) => this.pairRepository.save(pair))
    )
    // 参加者を新規追加
    await this.participantRepository.saveParticipant(participant)
  }
}
