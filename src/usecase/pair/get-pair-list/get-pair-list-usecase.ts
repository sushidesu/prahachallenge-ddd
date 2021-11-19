import { GetPairListInputData } from "./get-pair-list-input-data"
import { GetPairListOutputData } from "./get-pair-list-output-data"

export class GetPairListUsecase {
  /**
   * ペアの一覧取得
   *
   * - 引数によってソートやフィルタリングが可能
   * - ペアに所属している参加者の id, 名前 も一緒に取得する
   */
  async exec(input: GetPairListInputData): Promise<GetPairListOutputData> {
    console.log(input)
    // ペアをクエリサービスから複数取得
    // それを返す
    return new GetPairListOutputData()
  }
}
