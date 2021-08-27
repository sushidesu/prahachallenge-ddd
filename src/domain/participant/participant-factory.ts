import { DomainService } from "../shared/domainService"
import { Participant } from "./participant"
import { ParticipantId } from "./participant-id"
import { Email } from "./email"

export interface ParticipantFactoryProps {
  name: string
  email: string
}

export class ParticipantFactory extends DomainService<"participant-factory"> {
  async create({ name, email }: ParticipantFactoryProps): Promise<Participant> {
    // validate name
    if (name === "") throw Error("name cannot be empty")
    const emailValueObject = Email.create(email)

    const id = ParticipantId.create()
    return Participant.createFromFactory(id, { name, email: emailValueObject })
  }
}
