import { Pair } from "../domain/pair/pair"
import { IPairRepository } from "../domain/pair/pair-repository-interface"
import { GetPairListOutputData } from "../../../src/usecase/pair/get-pair-list/get-pair-list-output-data"

type PairResponse = GetPairListOutputData

export class PairRepository implements IPairRepository {
  private readonly API_ORIGIN: string
  constructor() {
    const origin = import.meta.env.VITE_API_ORIGIN
    if (typeof origin !== "string") {
      throw new Error("VITE_API_ORIGIN is not defined")
    }
    this.API_ORIGIN = origin
  }

  async getAll(): Promise<Pair[]> {
    console.log("PairRepository.getAll()")
    const res = await fetch(`${this.API_ORIGIN}/pair`, {
      mode: "cors",
    })
    const result = (await res.json()) as PairResponse

    return result.pairs.map((pair) => ({
      id: pair.id,
      name: pair.name,
      participants: pair.participants.map((participant) => ({
        id: participant.id,
        name: participant.name,
      })),
    }))
  }
}
