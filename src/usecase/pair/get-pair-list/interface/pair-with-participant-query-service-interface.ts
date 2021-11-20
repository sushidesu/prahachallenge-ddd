import { PairWithParticipantQueryCommand } from "./pair-with-participant-query-command"
import { PairWithParticipantDTO } from "./pair-with-participant-DTO"

export interface IPairWithParticipantQueryService {
  query(
    command: PairWithParticipantQueryCommand
  ): Promise<readonly PairWithParticipantDTO[]>
}
