import { DomainService } from "../shared/domainService"
import { Participant } from "./participant"
import { ParticipantId } from "./participant-id"

export interface ParticipantFactoryProps {
  name: string
  email: string
}

export class ParticipantFactory extends DomainService<"participant-factory"> {
  async create({ name, email }: ParticipantFactoryProps): Promise<Participant> {
    // validate name
    if (name === "") throw Error("name cannot be empty")

    // validate email
    if (email === "") throw Error("email cannot be empty")
    // TODO: email duplication check

    const id = ParticipantId.create()
    return Participant.createFromFactory(id, { name, email })
  }
}
