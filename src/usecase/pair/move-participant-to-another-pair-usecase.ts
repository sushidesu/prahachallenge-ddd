export class MoveParticipantToAnotherPairUsecase {
  /**
   * ペアの更新 (所属する参加者を別のペアに移動)
   */
  exec(): void {
    // - 移動元のペア entity を取得
    // - pair.参加者が1人移動しても存続可能()
    //   - true -> 移動したい参加者のみを別のペアに移動
    //   - false -> ペアのメンバー全員を別のペアに移動
    // - 参加者・ペア・チーム entity を保存
  }
}
