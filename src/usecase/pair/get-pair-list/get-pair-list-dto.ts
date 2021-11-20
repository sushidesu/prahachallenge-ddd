interface GetPairListDTOProps {
  pairs: readonly PairWithParticipant[]
}

interface PairWithParticipant {
  id: string
  name: string
  participants: readonly ParticipantSummary[]
}

interface ParticipantSummary {
  id: string
  name: string
}
export class GetPairListDTO {
  constructor(private readonly props: GetPairListDTOProps) {}
  get pairs(): readonly PairWithParticipant[] {
    return this.props.pairs
  }
}
