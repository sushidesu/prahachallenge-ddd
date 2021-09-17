import { Nominal } from "../../shared/nominal"
import deepEqual from "fast-deep-equal"

export interface ValueObjectProps {
  [key: string]: string | number
}

export abstract class ValueObject<
  T extends ValueObjectProps,
  Brand extends string
> extends Nominal<`value-object-${Brand}`> {
  constructor(public readonly props: T) {
    super()
  }

  public equals(vo?: ValueObject<T, Brand>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (vo.props === undefined) {
      return false
    }
    return deepEqual(vo.props, this.props)
  }
}
