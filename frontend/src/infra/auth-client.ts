import { auth } from "../plugins/firebase"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { IAuthClient } from "../domain/auth/auth-client-interface"
import { AuthStatus } from "../domain/auth/auth-status"

export class AuthClient implements IAuthClient {
  private _unsubscribe: (() => void) | undefined = undefined

  async login(props: { email: string; password: string }): Promise<void> {
    const { email, password } = props
    console.log("login")
    await signInWithEmailAndPassword(auth, email, password)
  }

  async logout(): Promise<void> {
    console.log("logout")
    await signOut(auth)
  }

  subscribe(callback: (status: AuthStatus) => void): void {
    console.log("subscribe")
    this._unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null && user.email !== null) {
        callback({
          type: "authorized",
          user: {
            uid: user.uid,
            email: user.email,
          },
        })
      } else {
        callback({ type: "unauthorized" })
      }
    })
  }

  unsubscribe(): void {
    console.log("unsubscribe")
    if (this._unsubscribe !== undefined) {
      this._unsubscribe()
    }
  }
}
