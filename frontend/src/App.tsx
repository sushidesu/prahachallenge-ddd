import { useCallback, useMemo } from "react"
import { useAuth } from "./hooks/useAuth"
import { useInput } from "./hooks/useInput"
import { AuthClient } from "./infra/auth-client"

export const App = (): JSX.Element => {
  // dependencies
  /// useMemoしないと、レンダリングのたびに new AuthClient() される
  /// → useAuth内で別物だと判定されるので毎回useEffectがクリーンアップされてしまう
  const authClient = useMemo(() => new AuthClient(), [])

  // hooks
  const { authStatus, login, logout } = useAuth(authClient)
  const [email, handleChangeEmail] = useInput()
  const [password, handleChangePassword] = useInput()

  // ログインフォーム
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()
      login({ email, password })
    },
    [login, email, password]
  )

  return (
    <div>
      <div>
        <p>{`auth: ${authStatus.type}`}</p>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>mail</label>
            <input type="email" value={email} onChange={handleChangeEmail} />
          </div>
          <div>
            <label>password</label>
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
