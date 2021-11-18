import { CreateParticipantInputData } from "./create-participant-input-data"

export class CreateParticipantUsecase {
  /**
   * 参加者の作成
   */
  exec(inputData: CreateParticipantInputData): void {
    console.log(inputData)
    // 参加者エンティティを生成
    // 保存
  }
}
