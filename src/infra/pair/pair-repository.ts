import { IPairRepository } from "../../domain/pair/interface/pair-repository"
import { Pair } from "../../domain/pair/pair"

export class PairRepository implements IPairRepository {
  async save(): Promise<void> {
    // TODO:
  }
  async getAllPairList(): Promise<Pair[]> {
    // TODO:
    return []
  }
  async getPairListInTeam(): Promise<Pair[]> {
    // TODO:
    return []
  }
  async getVacantPairList(): Promise<Pair[]> {
    // TODO:
    return []
  }
}