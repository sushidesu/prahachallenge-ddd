import { DomainService } from "../shared/domainService"
import { Participant } from "../participant/participant"
import { Pair } from "./pair"
import { PairName } from "./pair-name"

export interface PairFactoryProps {
  name: string
  participantList: Participant[]
}

export class PairFactory extends DomainService<"pair-factory"> {
  public create({ name, participantList }: PairFactoryProps): Pair {
    const pairName = PairName.create(name)
    return Pair.createFromFactory({
      name: pairName,
      participantIdList: participantList.map((participant) => participant.id),
    })
  }
}
