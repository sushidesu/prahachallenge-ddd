import { DomainService } from "../shared/domainService"
import { Pair } from "./pair"
import { ParticipantId } from "../participant/participant-id"
import { PairName } from "./pair-name"

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
