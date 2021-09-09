import { Entity } from "../shared/entity"
import { PairId } from "./pair-id"
import { ParticipantId } from "../participant/participant-id"

export interface PairProps {
  participantIdList: ParticipantId[]
}

export class Pair extends Entity<PairProps, "pair", PairId> {
  private constructor(id: PairId, props: PairProps) {
    super(id, props)
  }
  static create(props: PairProps): Pair {
    const id = PairId.create()
    // TODO: 参加者の人数を確認する
    return new Pair(id, props)
  }
  static reconstruct(id: PairId, props: PairProps): Pair {
    return new Pair(id, props)
  }
}
