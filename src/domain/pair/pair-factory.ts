import { DomainService } from "../shared/domainService"
import { Pair } from "./pair"
import { ParticipantId } from "../participant/participant-id"
import { TeamId } from "../team/team-id"
import { PairNameFactory } from "./pair-name-factory"

export interface PairFactoryProps {
  teamId: TeamId
  participantIdList: ParticipantId[]
}

export class PairFactory extends DomainService<"pair-factory"> {
  constructor(private pairNameFactory: PairNameFactory) {
    super()
  }

  public async create({
    teamId,
    participantIdList,
  }: PairFactoryProps): Promise<Pair> {
    const pairName = await this.pairNameFactory.create(teamId)
    return Pair.createFromFactory({
      name: pairName,
      teamId,
      participantIdList,
    })
  }
}
