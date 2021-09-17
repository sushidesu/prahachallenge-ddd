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

  public get participantIdList(): ParticipantId[] {
    // HELP: 名前が微妙かも
    return this.props.participantIdList
  }
  public acceptParticipant(participantId: ParticipantId): void {
    if (!this.canAcceptParticipant()) {
      throw new Error("参加者が3名いるペアには加入できません")
    }
    this.props.participantIdList.push(participantId)
  }
  public removeParticipant(participantId?: ParticipantId): {
    removedParticipantId: ParticipantId
  } {
    // 参加者を2名未満にはできない
    if (!this.canRemoveParticipant()) {
      throw new Error("参加者を2名未満にはできません")
    }
    // 対象を指定しない場合は最後の参加者を削除する
    if (participantId === undefined) {
      const removedParticipantId = this.props.participantIdList.pop()
      if (removedParticipantId === undefined) throw new Error("想定外のエラー")
      return {
        removedParticipantId,
      }
    }

    // ペアに存在しない参加者は削除できない
    if (!this.participantExists(participantId)) {
      throw new Error("ペアに存在しない参加者は削除できません")
    }
    this.props.participantIdList = this.props.participantIdList.filter(
      (id) => !id.equals(participantId)
    )
    return {
      removedParticipantId: participantId,
    }
  }

  private participantExists(participantId: ParticipantId): boolean {
    return (
      this.props.participantIdList.findIndex((id) =>
        id.equals(participantId)
      ) !== -1
    )
  }
  private canRemoveParticipant(): boolean {
    return this.props.participantIdList.length > 2
  }
  private canAcceptParticipant(): boolean {
    return this.props.participantIdList.length <= 2
  }
}
