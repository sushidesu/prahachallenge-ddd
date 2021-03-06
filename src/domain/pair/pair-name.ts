import { ValueObject, ValueObjectProps } from "../shared/valueObject"

export interface PairNameProps extends ValueObjectProps {
  value: string
}

export class PairName extends ValueObject<PairNameProps, "pair-name"> {
  private constructor(props: PairNameProps) {
    super(props)
  }
  public static create(name: string): PairName {
    if (name === "") {
      throw new Error("pair-name cannot be empty")
    }
    if (name.length > 1) {
      throw new Error("pair-name is too long")
    }
    const uppercase = /[A-Z]+/g
    if (uppercase.test(name)) {
      throw new Error("pair-name cannot be uppercase")
    }
    const lowercase_alphabet = /[a-z]/g
    if (!lowercase_alphabet.test(name)) {
      throw new Error("pair-name must be a lowercase alphabet")
    }
    return new PairName({ value: name })
  }
  public static reconstruct(name: string): PairName {
    return new PairName({ value: name })
  }
}
