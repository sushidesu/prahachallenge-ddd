import { DomainService } from "../shared/domainService"
import { Email } from "./email"

export class CheckEmailAlreadyExists extends DomainService<"check-email-already-exists"> {
  async do(email: Email): Promise<boolean> {
    if (email) {
      // TODO
      return true
    }
    return false
  }
}
