import { Entity } from "../shared/entity"
import { TeamId } from "./team-id"
import { TeamName } from "./team-name"
import { TeamNameFactory } from "./team-name-factory"

export interface TeamProps {
  name: TeamName
}

export class Team extends Entity<TeamProps, "team", TeamId> {
  private constructor(id: TeamId, props: TeamProps) {
    super(id, props)
  }
  static async create(teamNameFactory: TeamNameFactory): Promise<Team> {
    const id = TeamId.create()
    const name = await teamNameFactory.create()
    return new Team(id, {
      name,
    })
  }
  static reconstruct(id: TeamId, props: TeamProps): Team {
    return new Team(id, props)
  }
}
