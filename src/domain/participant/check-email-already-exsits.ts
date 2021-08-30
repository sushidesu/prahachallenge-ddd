import { DomainService } from "../shared/domainService"
import { Email } from "./email"

export class CheckEmailAlreadyExsists extends DomainService<"check-email-already-exsists"> {
  async exsits(email: Email): Promise<boolean> {
    if (email) {
      // TODO
      return true
    }
    return false
  }
}
