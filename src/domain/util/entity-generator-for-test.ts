import { Pair } from "../pair/pair"
import { PairId } from "../pair/pair-id"
import { PairName } from "../pair/pair-name"
import { Email } from "../participant/email"
import { Participant } from "../participant/participant"
import { ParticipantId } from "../participant/participant-id"
import { ParticipantName } from "../participant/participant-name"
import { Team } from "../team/team"
import { TeamId } from "../team/team-id"
import { TeamName } from "../team/team-name"

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

export const pair_id_values = {
  pair_id_a: PairId.reconstruct("id-pair-a"),
  pair_id_b: PairId.reconstruct("id-pair-b"),
  pair_id_c: PairId.reconstruct("id-pair-c"),
}

export const genPair = (name: string, participants: ParticipantId[]): Pair => {
  return Pair.reconstruct(PairId.reconstruct(`id-pair-${name}`), {
    name: PairName.reconstruct(name),
    participantIdList: participants,
  })
}

export const genTeam = (name: string, pairs: PairId[]): Team => {
  return Team.reconstruct(TeamId.reconstruct(`id-team-${name}`), {
    name: TeamName.reconstruct(name),
    pairIdList: pairs,
  })
}
