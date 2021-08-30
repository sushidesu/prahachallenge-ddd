import { DomainService } from "../shared/domainService"
import { Participant } from "./participant"
import { ParticipantId } from "./participant-id"
import { Name } from "./name"
import { Email } from "./email"
import { CheckEmailAlreadyExsists } from "./check-email-already-exsits"

export interface ParticipantFactoryProps {
  name: string
  email: string
}

export class ParticipantFactory extends DomainService<"participant-factory"> {
  constructor(private checkEmailAlready: CheckEmailAlreadyExsists) {
    super()
  }

  async create({ name, email }: ParticipantFactoryProps): Promise<Participant> {
    const id = ParticipantId.create()
    const nameValueObject = Name.create(name)
    const emailValueObject = Email.create(email, this.checkEmailAlready)

    return Participant.createFromFactory(id, {
      name: nameValueObject,
      email: emailValueObject,
    })
  }
}
