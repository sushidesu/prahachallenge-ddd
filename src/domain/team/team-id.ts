import { UniqueEntityId, UniqueEntityIdProps } from "../shared/uniqueEntityId"

export class TeamId extends UniqueEntityId<"team-id"> {
  private constructor(props?: UniqueEntityIdProps) {
    super(props)
  }
  static create(): TeamId {
    return new TeamId()
  }
  static reconstruct(id: string): TeamId {
    return new TeamId({ value: id })
  }
}
