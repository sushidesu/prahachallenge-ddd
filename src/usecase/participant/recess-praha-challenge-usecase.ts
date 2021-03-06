export class RecessPrahaChallengeUsecase {
  /**
   * 参加者の更新 (在籍ステータスの変更)
   *
   * `在籍中` から `休会中` に変更する
   */
  exec(): void {
    // - 変更したい参加者 entity を取得
    // - ペアの移動
    //   - 残りのペアが存続可能なら、そのまま
    //   - 存続不可能な場合、残りのペアのメンバーを、空きのあるペアに加入
    // - 参加者 entity の在籍ステータスを変更
    // - 参加者・ペア・チーム entity を保存
  }
}
