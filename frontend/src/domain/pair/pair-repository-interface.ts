import { Pair } from "./pair"

export interface IPairRepository {
  getAll(): Promise<Pair[]>
}
