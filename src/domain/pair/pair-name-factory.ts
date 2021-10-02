import { DomainService } from "../shared/domainService"
import { PairName } from "./pair-name"

export class PairNameFactory extends DomainService<"pair-name-factory"> {
  constructor() {
    super()
  }
  /**
   * ペア名を自動生成
   */
  async create(): Promise<PairName> {
    // TODO:
    return PairName.createFromFactory("")
  }
}
