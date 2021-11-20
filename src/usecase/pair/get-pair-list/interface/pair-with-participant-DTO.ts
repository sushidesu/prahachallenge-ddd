interface PairWithParticipantDTOProps {
  id: string
  name: string
  participants: readonly ParticipantSummary[]
}

interface ParticipantSummary {
  id: string
  name: string
}

export class PairWithParticipantDTO {
  constructor(public readonly props: PairWithParticipantDTOProps) {}
}
