import { ValueObject, ValueObjectProps } from "../shared/valueObject"
import { CheckEmailAlreadyExists } from "./check-email-already-exists"

export interface EmailProps extends ValueObjectProps {
  value: string
}

export class Email extends ValueObject<EmailProps, "email"> {
  private constructor(props: EmailProps) {
    super(props)
  }

  public static async create(
    email: string,
    checkEmailAlreadyExists: CheckEmailAlreadyExists
  ): Promise<Email> {
    if (email === "") throw new Error("email cannot be empty")

    const maybeEmail = new Email({ value: email })
    if (await checkEmailAlreadyExists.do(maybeEmail)) {
      throw Error("email has already exists")
    }

    return maybeEmail
  }

  public static reconstruct(email: string): Email {
    return new Email({ value: email })
  }
}
