export class LeavePrahaChallengeUsecase {
  /**
   * 参加者の更新 (在籍ステータスの変更)
   *
   * `在籍中` もしくは `休会中` から `退会済み` に変更する
   */
  exec(): void {
    // - 変更したい参加者 entity を取得
    // - ステータスが休会中の場合
    //   - 何もしない
    // - ステータスが在籍中の場合
    //   - ペアの移動 (recess-praha-challenge-usecaseと同様)
    // - 参加者entityの在籍ステータスを変更
    // - 参加者(・ペア・チーム) entity を保存
  }
}
