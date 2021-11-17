import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { TeamId } from "../../team/team-id"

export interface IPairRepository {
  insert(pair: Pair): Promise<void>
  update(pair: Pair): Promise<void>
  getPairById(pairId: PairId): Promise<Pair | undefined>
  getAllPairList(): Promise<Pair[]>
  getPairListInTeam(teamId: TeamId): Promise<Pair[]>
}
