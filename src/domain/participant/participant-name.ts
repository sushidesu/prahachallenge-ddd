import { ValueObject, ValueObjectProps } from "../shared/valueObject"

export interface NameProps extends ValueObjectProps {
  value: string
}

export class ParticipantName extends ValueObject<
  NameProps,
  "participant-name"
> {
  private constructor(props: NameProps) {
    super(props)
  }

  public static create(name: string): ParticipantName {
    if (name === "") throw new Error("name cannot be empty")

    return new ParticipantName({ value: name })
  }

  public static reconstruct(name: string): ParticipantName {
    return new ParticipantName({ value: name })
  }
}
