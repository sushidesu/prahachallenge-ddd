import { GetPairListDTO } from "./get-pair-list-dto"
import { IPairWithParticipantQueryService } from "./interface/pair-with-participant-query-service-interface"

/**
 * ペアの一覧取得
 *
 * - ペアに所属している参加者の id, 名前 も一緒に取得する
 */
export class GetPairListUsecase {
  constructor(
    private readonly pairWithParticipantQueryService: IPairWithParticipantQueryService
  ) {}

  async exec(): Promise<GetPairListDTO> {
    // ペアをクエリサービスから複数取得
    const result = await this.pairWithParticipantQueryService.query()
    // それを返す
    return new GetPairListDTO({
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
