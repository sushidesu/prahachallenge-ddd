import { Nominal } from "../../shared/nominal"

export interface ValueObjectProps {
  [key: string]: string | number
}

export abstract class ValueObject<
  T extends ValueObjectProps,
  Brand extends string
> extends Nominal<Brand> {
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
    return JSON.stringify(vo) === JSON.stringify(this.props)
  }
}
