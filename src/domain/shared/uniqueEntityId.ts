import { ValueObject, ValueObjectProps } from "./valueObject"
import { v4 as uuid } from "uuid"

export interface UniqueEntityIdProps extends ValueObjectProps {
  value: string
}

export abstract class UniqueEntityId<Brand extends string> extends ValueObject<
  UniqueEntityIdProps,
  Brand
> {
  protected constructor(props?: UniqueEntityIdProps) {
    if (props) {
      super(props)
    } else {
      super({ value: uuid() })
    }
  }
}
