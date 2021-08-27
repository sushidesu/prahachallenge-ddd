import { ValueObject, ValueObjectProps } from "../shared/valueObject"

export interface EmailProps extends ValueObjectProps {
  value: string
}

export class Email extends ValueObject<EmailProps, "email"> {
  private constructor(props: EmailProps) {
    super(props)
  }

  public static create(email: string): Email {
    if (email === "") throw new Error("email cannot be empty")
    // TODO: 重複チェック

    return new Email({ value: email })
  }

  public static reconstruct(email: string): Email {
    return new Email({ value: email })
  }
}
