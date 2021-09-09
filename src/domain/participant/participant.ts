import { Entity } from "../shared/entity"
import { ParticipantId } from "./participant-id"
import { ParticipantName } from "./participant-name"
import { Email } from "./email"
import { CheckEmailAlreadyExists } from "./check-email-already-exists"

export interface ParticipantProps {
  name: ParticipantName
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

  public get name(): ParticipantName {
    return this.props.name
  }
  changeName(name: string): void {
    const newName = ParticipantName.create(name)
    this.props.name = newName
  }

  public get email(): Email {
    return this.props.email
  }
  async changeEmail(
    email: string,
    checkEmailAlreadyExists: CheckEmailAlreadyExists
  ): Promise<void> {
    const newEmail = await Email.create(email, checkEmailAlreadyExists)
    this.props.email = newEmail
  }
}
