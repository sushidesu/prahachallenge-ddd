import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"

export interface IParticipantRepository {
  getParticipantById(id: ParticipantId): Promise<Participant>
  saveParticipant(participant: Participant): Promise<void>
}
