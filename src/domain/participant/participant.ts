import { Entity } from "../shared/entity"
import { ParticipantId } from "./participant-id"
import { Name } from "./name"
import { Email } from "./email"
import { CheckEmailAlreadyExsists } from "./check-email-already-exsits"

export interface ParticipantProps {
  name: Name
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
    const newName = Name.create(name)
    this.props.name = newName
  }

  changeEmail(
    email: string,
    checkEmailAlready: CheckEmailAlreadyExsists
  ): void {
    const newEmail = Email.create(email, checkEmailAlready)
    this.props.email = newEmail
  }
}
