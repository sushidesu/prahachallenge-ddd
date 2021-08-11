export class DeleteLeavedParticipant {
  /**
   * 参加者の削除
   *
   * 在籍ステータスが `退会済み` の場合のみ削除が可能
   */
  exec(): void {
    // - 削除したい参加者 entity を取得
    // - entity.canBeDeleted() の場合
    //   - repositoryから削除
    // - そうでない場合、エラーが発生
  }
}
