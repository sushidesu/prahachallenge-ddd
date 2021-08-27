import { Nominal } from "../../shared/nominal"

export abstract class DomainService<
  Brand extends string
> extends Nominal<`domain-service-${Brand}`> {}
