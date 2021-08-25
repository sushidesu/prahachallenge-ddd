import { UniqueEntityId, UniqueEntityIdProps } from "../shared/uniqueEntityId"

export class ParticipantId extends UniqueEntityId<"participant-id"> {
  private constructor(props?: UniqueEntityIdProps) {
    super(props)
  }

  static reconstruct(id: string): ParticipantId {
    return new ParticipantId({ value: id })
  }
  static create(): ParticipantId {
    return new ParticipantId()
  }
}
