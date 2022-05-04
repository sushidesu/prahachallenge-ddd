import { Pair } from "./pair"

export interface IPairRepository {
  getAll(token: string): Promise<Pair[]>
}
