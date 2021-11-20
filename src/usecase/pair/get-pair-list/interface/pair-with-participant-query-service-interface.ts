import { GetPairListWithParticipantDTO } from "../get-pair-list-with-participant-dto"

export interface IPairWithParticipantQueryService {
  query(): Promise<GetPairListWithParticipantDTO>
}
