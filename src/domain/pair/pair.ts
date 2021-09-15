import { Entity } from "../shared/entity"
import { PairId } from "./pair-id"
import { ParticipantId } from "../participant/participant-id"
import { PairName } from "./pair-name"

export interface PairProps {
  participantIdList: ParticipantId[]
  name: PairName
}

export class Pair extends Entity<PairProps, "pair", PairId> {
  private constructor(id: PairId, props: PairProps) {
    super(id, props)
  }
  static createFromFactory(props: PairProps): Pair {
    const id = PairId.create()
    const { participantIdList } = props
    if (participantIdList.length < 2 || 3 < participantIdList.length) {
      throw new Error("the number of people who can join a pair is 2 or 3")
    }
    return new Pair(id, props)
  }
  static reconstruct(id: PairId, props: PairProps): Pair {
    return new Pair(id, props)
  }

  public acceptParticipant(participantId: ParticipantId): void {
    this.props.participantIdList.push(participantId)
  }
}
