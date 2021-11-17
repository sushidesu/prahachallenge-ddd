import { Entity } from "../shared/entity"
import { TeamId } from "./team-id"
import { TeamName } from "./team-name"
import { PairId } from "../pair/pair-id"
import { TeamNameFactory } from "./team-name-factory"
import { GetParticipantCountInPairs } from "./domain-service/get-participant-count-in-pairs"

export interface TeamProps {
  name: TeamName
  pairIdList: PairId[]
}

export class Team extends Entity<TeamProps, "team", TeamId> {
  private constructor(id: TeamId, props: TeamProps) {
    super(id, props)
  }
  static async create(
    teamNameFactory: TeamNameFactory,
    getParticipantCountInPairs: GetParticipantCountInPairs,
    pairIdList: PairId[]
  ): Promise<Team> {
    const id = TeamId.create()
    const name = await teamNameFactory.create()
    const participantCount = await getParticipantCountInPairs.do(pairIdList)
    if (participantCount < 3) {
      throw new Error("チームの参加者は最低3名必要です")
    }
    return new Team(id, {
      name,
      pairIdList,
    })
  }
  static reconstruct(id: TeamId, props: TeamProps): Team {
    return new Team(id, props)
  }

  public acceptParticipant(participantId: unknown): void {
    console.log(participantId)
    // FIXME: delete this method
  }
}
