import { useCallback, useEffect, useState } from "react"
import { IAuthClient } from "../domain/auth/auth-client-interface"
import { AuthStatus } from "../domain/auth/auth-status"

type LoginFunction = (props: {
  email: string
  password: string
}) => Promise<void>
type LogoutFunction = () => Promise<void>

export type UseAuthResponse = {
  authStatus: AuthStatus
  login: LoginFunction
  logout: LogoutFunction
}

export const useAuth = (authClient: IAuthClient): UseAuthResponse => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({ type: "loading" })

  /**
   * メール・パスワードでログインする
   */
  const login = useCallback<LoginFunction>(
    async (props) => {
      const { email, password } = props
      await authClient.login({ email, password })
    },
    [authClient]
  )

  /**
   * ログアウトする
   */
  const logout = useCallback<LogoutFunction>(async () => {
    await authClient.logout()
  }, [authClient])

  /**
   * - 認証状態を監視する
   * - アンマウント時にはクリーンアップされる
   */
  useEffect(() => {
    authClient.subscribe((status) => {
      setAuthStatus(status)
    })
    return () => {
      authClient.unsubscribe()
    }
  }, [authClient])

  return {
    authStatus,
    login,
    logout,
  }
}
