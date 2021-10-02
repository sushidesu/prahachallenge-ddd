import { DomainService } from "../shared/domainService"
import { Pair } from "./pair"
import { PairName } from "./pair-name"
import { ParticipantId } from "../participant/participant-id"

export interface PairFactoryProps {
  name: string
  participantIdList: ParticipantId[]
}

export class PairFactory extends DomainService<"pair-factory"> {
  public create({ name, participantIdList }: PairFactoryProps): Pair {
    const pairName = PairName.create(name)
    return Pair.createFromFactory({
      name: pairName,
      participantIdList,
    })
  }
}
