import { Email } from "../../domain/participant/email"
import { IParticipantRepository } from "../../domain/participant/interface/participant-repository"
import { Participant } from "../../domain/participant/participant"
import { ParticipantId } from "../../domain/participant/participant-id"
import { ParticipantName } from "../../domain/participant/participant-name"

export class ParticipantRepository implements IParticipantRepository {
  async save(): Promise<void> {
    // TODO:
  }
  async getParticipantById(): Promise<Participant | undefined> {
    // TODO:
    return Participant.reconstruct(ParticipantId.reconstruct("a"), {
      name: ParticipantName.reconstruct("test-member"),
      email: Email.reconstruct("test@example.com"),
    })
  }
  async getParticipantsByEmail(): Promise<Participant[]> {
    // TODO:
    return []
  }
}
