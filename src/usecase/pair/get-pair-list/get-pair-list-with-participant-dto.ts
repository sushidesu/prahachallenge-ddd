interface GetPairListWithParticipantDTOProps {
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

// HELP: ユースケースに合わせてDTOを定義したが、例えば UserDTO, PairDTOのようにエンティティごとに分けたほうがわかりやすいか？
export class GetPairListWithParticipantDTO {
  constructor(private readonly props: GetPairListWithParticipantDTOProps) {}
  get pairs(): readonly PairWithParticipant[] {
    return this.props.pairs
  }
}
