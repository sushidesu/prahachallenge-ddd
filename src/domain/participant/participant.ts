import { Entity } from "../shared/entity"
import { ParticipantId } from "./participant-id"
import { ParticipantName } from "./participant-name"
import { Email } from "./email"
import { CheckEmailAlreadyExists } from "./domain-service/check-email-already-exists"

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

  // getters
  public get name(): ParticipantName {
    return this.props.name
  }
  public get email(): Email {
    return this.props.email
  }

  /**
   * 名前を変更する
   */
  changeName(name: string): void {
    const newName = ParticipantName.create(name)
    this.props.name = newName
  }

  /**
   * メールアドレスを変更する
   */
  async changeEmail(
    email: string,
    checkEmailAlreadyExists: CheckEmailAlreadyExists
  ): Promise<void> {
    // 変更がない場合、処理を終了する
    if (this.props.email.props.value === email) {
      return
    }
    const newEmail = await Email.create(email, checkEmailAlreadyExists)
    this.props.email = newEmail
  }
}
