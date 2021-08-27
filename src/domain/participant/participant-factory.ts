import { DomainService } from "../shared/domainService"
import { Participant } from "./participant"
import { ParticipantId } from "./participant-id"
import { Name } from "./name"
import { Email } from "./email"

export interface ParticipantFactoryProps {
  name: string
  email: string
}

export class ParticipantFactory extends DomainService<"participant-factory"> {
  async create({ name, email }: ParticipantFactoryProps): Promise<Participant> {
    const id = ParticipantId.create()
    const nameValueObject = Name.create(name)
    const emailValueObject = Email.create(email)

    return Participant.createFromFactory(id, {
      name: nameValueObject,
      email: emailValueObject,
    })
  }
}
