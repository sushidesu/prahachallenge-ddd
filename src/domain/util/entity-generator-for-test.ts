import { Pair } from "../pair/pair"
import { PairId } from "../pair/pair-id"
import { PairName } from "../pair/pair-name"
import { Email } from "../participant/email"
import { Participant } from "../participant/participant"
import { ParticipantId } from "../participant/participant-id"
import { ParticipantName } from "../participant/participant-name"

export const participant_id_values = {
  p_01: ParticipantId.reconstruct("id-participant-01"),
  p_02: ParticipantId.reconstruct("id-participant-02"),
  p_03: ParticipantId.reconstruct("id-participant-03"),
  p_04: ParticipantId.reconstruct("id-participant-04"),
  p_05: ParticipantId.reconstruct("id-participant-05"),
}

export const genParticipant = (name: string): Participant => {
  return Participant.reconstruct(
    ParticipantId.reconstruct(`id-participant-${name}`),
    {
      name: ParticipantName.reconstruct(name),
      email: Email.reconstruct(`${name}@example.com`),
    }
  )
}

export const genPair = (name: string, participants: ParticipantId[]): Pair => {
  return Pair.reconstruct(PairId.reconstruct(`id-pair-${name}`), {
    name: PairName.reconstruct(name),
    participantIdList: participants,
  })
}
