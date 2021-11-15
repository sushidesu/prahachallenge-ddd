import { DomainService } from "../../shared/domainService"
import { Email } from "../email"
import { IParticipantRepository } from "../interface/participant-repository"

export class CheckEmailAlreadyExists extends DomainService<"check-email-already-exists"> {
  constructor(private participantRepository: IParticipantRepository) {
    super()
  }
  async do(email: Email): Promise<boolean> {
    const participants =
      await this.participantRepository.getParticipantsByEmail(email)
    return participants.length > 0
  }
}
