export type AuthStatus =
  | {
      type: "loading" // 認証・未認証を判定する前の状態 (読み込み中)
    }
  | {
      type: "authorized" // 認証済み
      user: User
    }
  | {
      type: "unauthorized" // 未認証
    }

type User = {
  uid: string
  email: string
}
