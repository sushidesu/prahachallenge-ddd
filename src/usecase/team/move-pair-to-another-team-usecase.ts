export class MovePairToAnotherTeamUsecase {
  /**
   * チームの更新 (所属するペアを別のチームに移動)
   */
  exec(): void {
    // - 移動元のチーム entity を取得
    // - team.ペアが1つ移動しても存続可能()
    //   - true -> 移動したいペアを別のチームに移動
    //   - false -> チームに所属しているペア全てを別のチームに移動
    // - ペア・チーム entity を保存
  }
}
