import { useCallback, useMemo } from "react"
import { useAuth } from "./hooks/useAuth"
import { useInput } from "./hooks/useInput"
import { usePairList } from "./hooks/usePairList"
import { AuthClient } from "./infra/auth-client"
import { PairRepository } from "./infra/pair-repository"

export const App = (): JSX.Element => {
  // dependencies
  /// useMemoしないと、レンダリングのたびに new AuthClient() される
  /// → useAuth内で別物だと判定されるので毎回useEffectがクリーンアップされてしまう
  const authClient = useMemo(() => new AuthClient(), [])
  const pairRepository = useMemo(() => new PairRepository(), [])

  // hooks
  /// 認証state
  const { authStatus, login, logout } = useAuth(authClient)
  /// フォームのstate
  const [email, handleChangeEmail] = useInput()
  const [password, handleChangePassword] = useInput()
  /// ペアをAPIから取得する
  const [pairs, getPairList] = usePairList(pairRepository)

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
      <hr />
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
      <hr />
      <div>
        <div>
          <p>ペア一覧</p>
          <button onClick={getPairList}>取得する</button>
        </div>
        <div>
          {pairs.type === "loading" && <p>ロード中...</p>}
          {pairs.type === "complete" && (
            <ul>
              {pairs.value.map((pair) => (
                <li key={pair.id}>
                  <p>{pair.name}</p>
                  <ul>
                    {pair.participants.map((p) => (
                      <li key={p.id}>{p.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
