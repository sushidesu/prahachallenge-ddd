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

  // ペア一覧取得
  const handleClickGetPairs = useCallback(async () => {
    if (authStatus.type !== "authorized") {
      // 未認証の場合、仮のトークンでリクエストを送信する (401エラーが返る)
      getPairList("dummy_token")
    } else {
      getPairList(authStatus.user.token)
    }
  }, [authStatus, getPairList])

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
          <button onClick={handleClickGetPairs}>取得する</button>
        </div>
        <div>
          {pairs.type === "loading" && <p>ロード中...</p>}
          {pairs.type === "completeWithValue" && (
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
          {pairs.type === "completeWithError" &&
            `エラー: ${pairs.error.message}`}
        </div>
      </div>
    </div>
  )
}
