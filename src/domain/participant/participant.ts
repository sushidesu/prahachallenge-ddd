import { Entity } from "../shared/entity"
import { ParticipantId } from "./participant-id"
import { Email } from "./email"

export interface ParticipantProps {
  name: string
  email: Email
}

export class Participant extends Entity<
  ParticipantProps,
  "participant",
  ParticipantId
> {
  private constructor(id: ParticipantId, props: ParticipantProps) {
    super(id, props)
  }
  static createFromFactory(
    id: ParticipantId,
    props: ParticipantProps
  ): Participant {
    return new Participant(id, props)
  }
  static reconstruct(id: ParticipantId, props: ParticipantProps): Participant {
    return new Participant(id, props)
  }

  changeName(name: string): void {
    if (name === "") {
      throw Error("name cannot be empty")
    }
    this.props.name = name
  }

  changeEmail(email: string): void {
    const newEmail = Email.create(email)
    this.props.email = newEmail
  }
}
