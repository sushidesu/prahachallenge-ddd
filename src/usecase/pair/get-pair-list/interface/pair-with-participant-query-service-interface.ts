import { GetPairListDTO } from "../get-pair-list-dto"

export interface IPairWithParticipantQueryService {
  query(): Promise<GetPairListDTO>
}
