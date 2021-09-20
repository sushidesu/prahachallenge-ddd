import { ValueObject, ValueObjectProps } from "../shared/valueObject"

export interface TeamNameProps extends ValueObjectProps {
  value: string
}

export class TeamName extends ValueObject<TeamNameProps, "team-name"> {
  private constructor(props: TeamNameProps) {
    super(props)
  }
  static createFromFactory(name: string): TeamName {
    const parsed = parseFloat(name)
    if (!Number.isInteger(parsed)) {
      throw new Error("チーム名は整数である必要があります")
    }
    if (parsed < 1) {
      throw new Error("チーム名は1以上である必要があります")
    }
    if (parsed > 999) {
      throw new Error("チーム名は999以下である必要があります")
    }
    return new TeamName({ value: name })
  }
  static reconstruct(name: string): TeamName {
    return new TeamName({ value: name })
  }
}
