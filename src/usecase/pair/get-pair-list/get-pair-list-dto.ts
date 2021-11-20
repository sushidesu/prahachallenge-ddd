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

// HELP: ユースケースに合わせてDTOを定義したが、例えば UserDTO, PairDTOのようにエンティティごとに分けたほうがわかりやすいか？
export class GetPairListDTO {
  constructor(private readonly props: GetPairListDTOProps) {}
  get pairs(): readonly PairWithParticipant[] {
    return this.props.pairs
  }
}
