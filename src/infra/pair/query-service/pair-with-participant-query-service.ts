import { Context } from "../../shared/context"
import { IPairWithParticipantQueryService } from "../../../usecase/pair/get-pair-list/interface/pair-with-participant-query-service-interface"
import { PairWithParticipantQueryCommand } from "../../../usecase/pair/get-pair-list/interface/pair-with-participant-query-command"
import { PairWithParticipantDTO } from "../../../usecase/pair/get-pair-list/interface/pair-with-participant-DTO"

export class PairWithParticipantQueryService
  implements IPairWithParticipantQueryService
{
  constructor(private readonly context: Context) {}
  async query(
    _command: PairWithParticipantQueryCommand
  ): Promise<readonly PairWithParticipantDTO[]> {
    return []
  }
}
