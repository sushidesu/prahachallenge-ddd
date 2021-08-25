import { Nominal } from "../../shared/nominal"
import { UniqueEntityId } from "./uniqueEntityId"

export abstract class Entity<
  T,
  Brand extends string,
  Id extends UniqueEntityId<string>
> extends Nominal<Brand> {
  constructor(public readonly id: Id, protected readonly props: T) {
    super()
  }

  public equals(entity?: Entity<T, Brand, Id>): boolean {
    if (entity === null || entity === undefined) {
      return false
    }
    return this.id.equals(entity.id)
  }
}
