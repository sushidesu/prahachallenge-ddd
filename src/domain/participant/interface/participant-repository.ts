import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"
import { Email } from "../email"

export interface IParticipantRepository {
  getParticipantById(id: ParticipantId): Promise<Participant | undefined>
  insert(participant: Participant): Promise<void>
  update(particiapnt: Participant): Promise<void>
  getParticipantsByEmail(email: Email): Promise<Participant[]>
}
