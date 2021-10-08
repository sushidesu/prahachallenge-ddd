import { ParticipantId } from "../participant/participant-id"
import { Entity } from "../shared/entity"
import { TeamName } from "./team-name"
import { TeamNameFactory } from "./team-name-factory"
import { TeamId } from "./team-id"

export interface TeamProps {
  name: TeamName
  participantIdList: ParticipantId[]
}

export class Team extends Entity<TeamProps, "team", TeamId> {
  private constructor(id: TeamId, props: TeamProps) {
    super(id, props)
  }
  static async create(
    teamNameFactory: TeamNameFactory,
    participantIdList: ParticipantId[]
  ): Promise<Team> {
    const id = TeamId.create()
    const name = await teamNameFactory.create()
    if (participantIdList.length < 3) {
      throw new Error("チームの参加者は最低3名必要です")
    }
    return new Team(id, {
      name,
      participantIdList,
    })
  }
  static reconstruct(id: TeamId, props: TeamProps): Team {
    return new Team(id, props)
  }

  public acceptParticipant(participantId: ParticipantId): void {
    this.props.participantIdList.push(participantId)
  }
  public removeParticipant(participantId: ParticipantId): void {
    if (!this.canRemoveParticipant()) {
      throw new Error("参加者を3名未満にはできません")
    }
    this.props.participantIdList = this.props.participantIdList.filter(
      (id) => !id.equals(participantId)
    )
  }
  public canRemoveParticipant(): boolean {
    return this.props.participantIdList.length > 3
  }
}
