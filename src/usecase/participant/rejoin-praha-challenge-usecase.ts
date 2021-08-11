export class RejoinPrahaChallengeUsecase {
  /**
   * 参加者の更新 (在籍ステータスの変更)
   *
   * `休会中` から `在籍中` に変更する
   */
  exec(): void {
    // - 変更したい参加者 entity を取得
    // - 参加者 entity の在籍ステータスの変更
    // - 空きのあるペアに加入 (join-praha-challenge-usecaseと同様)
    // - 参加者・ペア・チーム entity を保存
  }
}
