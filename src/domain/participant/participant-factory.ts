import { DomainService } from "../shared/domainService"
import { Participant } from "./participant"
import { ParticipantId } from "./participant-id"
import { ParticipantName } from "./participant-name"
import { Email } from "./email"
import { CheckEmailAlreadyExists } from "./domain-service/check-email-already-exists"

export interface ParticipantFactoryProps {
  name: string
  email: string
}

export class ParticipantFactory extends DomainService<"participant-factory"> {
  constructor(private checkEmailAlreadyExists: CheckEmailAlreadyExists) {
    super()
  }

  async create({ name, email }: ParticipantFactoryProps): Promise<Participant> {
    const id = ParticipantId.create()
    const nameValueObject = ParticipantName.create(name)
    const emailValueObject = await Email.create(
      email,
      this.checkEmailAlreadyExists
    )

    return Participant.createFromFactory(id, {
      name: nameValueObject,
      email: emailValueObject,
    })
  }
}
