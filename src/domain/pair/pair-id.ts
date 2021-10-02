import { UniqueEntityId, UniqueEntityIdProps } from "../shared/uniqueEntityId"

export class PairId extends UniqueEntityId<"pair-id"> {
  private constructor(props?: UniqueEntityIdProps) {
    super(props)
  }
  static reconstruct(id: string): PairId {
    return new PairId({ value: id })
  }
  static create(): PairId {
    return new PairId()
  }
}
