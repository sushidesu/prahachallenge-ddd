import { Pair } from "../pair"

export interface IPairRepository {
  save(pair: Pair): Promise<void>
  getVacantPairList(): Promise<Pair[]>
}
