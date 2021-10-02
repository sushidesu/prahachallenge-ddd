import { DomainService } from "../shared/domainService"
import { Pair } from "./pair"
import { PairName } from "./pair-name"
import { ParticipantId } from "../participant/participant-id"
import { TeamId } from "../team/team-id"

export interface PairFactoryProps {
  name: string
  teamId: TeamId
  participantIdList: ParticipantId[]
}

export class PairFactory extends DomainService<"pair-factory"> {
  public create({ name, teamId, participantIdList }: PairFactoryProps): Pair {
    const pairName = PairName.create(name)
    return Pair.createFromFactory({
      name: pairName,
      teamId,
      participantIdList,
    })
  }
}
