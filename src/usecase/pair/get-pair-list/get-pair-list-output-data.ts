interface GetPairListOutputDataProps {
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
export class GetPairListOutputData {
  constructor(private readonly props: GetPairListOutputDataProps) {}
  get pairs(): readonly PairWithParticipant[] {
    return this.props.pairs
  }
}
