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
    // それを返す
    return this.pairWithParticipantQueryService.query()
  }
}
