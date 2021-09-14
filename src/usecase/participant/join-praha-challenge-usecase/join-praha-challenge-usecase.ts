import { JoinPrahaChallengeInputData } from "./join-praha-challenge-input-data"
import { ParticipantFactory } from "../../../domain/participant/participant-factory"
import { IParticipantRepository } from "../../../domain/participant/interface/participant-repository"
import { IPairRepository } from "../../../domain/pair/interface/pair-repository"
import { JoinPair } from "../../../domain/pair/join-pair"

export class JoinPrahaChallengeUsecase {
  constructor(
    private participantRepository: IParticipantRepository,
    private pairRepository: IPairRepository,
    private participantFactory: ParticipantFactory,
    private joinPair: JoinPair
  ) {}
  /**
   * 参加者の新規追加
   */
  async exec(inputData: JoinPrahaChallengeInputData): Promise<void> {
    // 参加者 entity を生成
    const { name, email } = inputData.props
    const participant = await this.participantFactory.create({
      name,
      email,
    })

    // 空きのあるペアに加入する
    const { changedPairList } = await this.joinPair.do(participant)

    // 変更のあったペアを保存
    await Promise.all(
      changedPairList.map((pair) => this.pairRepository.save(pair))
    )
    // 参加者を新規追加
    await this.participantRepository.save(participant)
  }
}
