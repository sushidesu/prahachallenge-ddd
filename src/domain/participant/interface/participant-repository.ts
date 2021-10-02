import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"
import { Email } from "../email"

export interface IParticipantRepository {
  getParticipantById(id: ParticipantId): Promise<Participant>
  save(participant: Participant): Promise<void>
  getParticipantsByEmail(email: Email): Promise<Participant[]>
}
