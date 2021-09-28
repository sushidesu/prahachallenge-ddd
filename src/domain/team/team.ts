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
}
