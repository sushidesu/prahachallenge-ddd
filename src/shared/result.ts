type SuccessResult<T> = T extends undefined
  ? {
      ok: true
    }
  : {
      ok: true
      value: T
    }

type FailureResult<E> = E extends undefined
  ? {
      ok: false
    }
  : {
      ok: false
      error: E
    }

export type Result<T = undefined, E = undefined> =
  | SuccessResult<T>
  | FailureResult<E>
