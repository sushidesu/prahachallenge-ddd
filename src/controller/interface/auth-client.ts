import { Result } from "../../shared/result"

export interface IAuthClient {
  verifyToken(
    token: string
  ): Promise<Result<{ uid: string }, { message: string }>>
}
