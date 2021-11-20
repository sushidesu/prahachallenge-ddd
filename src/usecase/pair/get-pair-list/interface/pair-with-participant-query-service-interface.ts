import { PairWithParticipantDTO } from "./pair-with-participant-DTO"

export interface IPairWithParticipantQueryService {
  query(): Promise<readonly PairWithParticipantDTO[]>
}
