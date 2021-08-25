import { Entity } from "../shared/entity"
import { ParticipantId } from "./participant-id"

export interface ParticipantProps {
  name: string
  email: string
}

export class Participant extends Entity<
  ParticipantProps,
  "participant",
  ParticipantId
> {
  private constructor(id: ParticipantId, props: ParticipantProps) {
    super(id, props)
  }
  static create(props: ParticipantProps): Participant {
    const id = ParticipantId.create()
    return new Participant(id, props)
  }
  static reconstruct(id: ParticipantId, props: ParticipantProps): Participant {
    return new Participant(id, props)
  }
}
