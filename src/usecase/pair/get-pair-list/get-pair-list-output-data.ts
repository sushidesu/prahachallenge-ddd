interface GetPairListOutputDataProps {
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

  get id(): string {
    return this.props.id
  }
  get name(): string {
    return this.props.name
  }
  get participants(): readonly ParticipantSummary[] {
    return this.props.participants
  }
}
