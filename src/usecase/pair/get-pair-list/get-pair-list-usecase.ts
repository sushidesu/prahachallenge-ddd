import { GetPairListInputData } from "./get-pair-list-input-data"
import { GetPairListOutputData } from "./get-pair-list-output-data"
import { IPairWithParticipantQueryService } from "./interface/pair-with-participant-query-service-interface"
import { PairWithParticipantQueryCommand } from "./interface/pair-with-participant-query-command"

/**
 * ペアの一覧取得
 *
 * - 引数によってソートやフィルタリングが可能
 * - ペアに所属している参加者の id, 名前 も一緒に取得する
 */
export class GetPairListUsecase {
  constructor(
    private readonly pairWithParticipantQueryService: IPairWithParticipantQueryService
  ) {}

  async exec(input: GetPairListInputData): Promise<GetPairListOutputData> {
    console.log(input)
    // ペアをクエリサービスから複数取得
    const command = new PairWithParticipantQueryCommand()
    const result = await this.pairWithParticipantQueryService.query(command)
    // それを返す
    return new GetPairListOutputData({
      pairs: result.map((pair) => ({
        id: pair.props.id,
        name: pair.props.name,
        participants: pair.props.participants.map((p) => ({
          id: p.id,
          name: p.name,
        })),
      })),
    })
  }
}
