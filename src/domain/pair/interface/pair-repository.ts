import { Pair } from "../pair"
import { TeamId } from "../../team/team-id"

export interface IPairRepository {
  insert(pair: Pair): Promise<void>
  update(pair: Pair): Promise<void>
  getAllPairList(): Promise<Pair[]>
  getPairListInTeam(teamId: TeamId): Promise<Pair[]>
  getVacantPairList(): Promise<Pair[]>
}
