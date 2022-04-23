import { AuthStatus } from "./auth-status"

export interface IAuthClient {
  login(props: { email: string; password: string }): Promise<void>
  logout(): Promise<void>
  subscribe(callback: (status: AuthStatus) => void): void
  unsubscribe(): void
}
