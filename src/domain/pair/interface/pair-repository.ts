import { Pair } from "../pair"

export interface IPairRepository {
  save(pair: Pair): Promise<void>
  getAllPairList(): Promise<Pair[]>
  getVacantPairList(): Promise<Pair[]>
}
