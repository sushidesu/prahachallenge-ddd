import { ValueObject, ValueObjectProps } from "../shared/valueObject"

export interface NameProps extends ValueObjectProps {
  value: string
}

export class Name extends ValueObject<NameProps, "name"> {
  private constructor(props: NameProps) {
    super(props)
  }

  public static create(name: string): Name {
    if (name === "") throw new Error("name cannot be empty")

    return new Name({ value: name })
  }

  public static reconstruct(name: string): Name {
    return new Name({ value: name })
  }
}
