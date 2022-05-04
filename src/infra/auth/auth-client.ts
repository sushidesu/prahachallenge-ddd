import { IAuthClient } from "../../controller/interface/auth-client"
import { Result } from "../../shared/result"
import { auth } from "../../plugins/firebase"

export class AuthClient implements IAuthClient {
  async verifyToken(
    token: string
  ): Promise<Result<{ uid: string }, { message: string }>> {
    try {
      const decodedIdToken = await auth.verifyIdToken(token)
      return {
        ok: true,
        value: {
          uid: decodedIdToken.uid,
        },
      }
    } catch (err) {
      if (err instanceof Error) {
        return {
          ok: false,
          error: {
            message: err.message,
          },
        }
      } else {
        return {
          ok: false,
          error: {
            message: "unexpected error",
          },
        }
      }
    }
  }
}
