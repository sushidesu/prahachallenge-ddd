import { useCallback, useState } from "react"
import { Pair } from "../domain/pair/pair"
import { IPairRepository } from "../domain/pair/pair-repository-interface"

type Loadable<T, E> =
  | {
      type: "default"
    }
  | {
      type: "loading"
    }
  | {
      type: "completeWithValue"
      value: T
    }
  | {
      type: "completeWithError"
      error: E
    }

type GetPairListFunction = (token: string) => Promise<void>

type UsePairListResponse = [Loadable<Pair[], Error>, GetPairListFunction]

export const usePairList = (
  pairRepository: IPairRepository
): UsePairListResponse => {
  const [pairs, setPairs] = useState<Loadable<Pair[], Error>>({
    type: "default",
  })

  /**
   * pairを取得してstateを更新する
   */
  const getPairs = useCallback(
    async (token: string): Promise<void> => {
      setPairs({ type: "loading" })
      try {
        const result = await pairRepository.getAll(token)
        setPairs({ type: "completeWithValue", value: result })
      } catch (err) {
        if (err instanceof Error) {
          setPairs({ type: "completeWithError", error: err })
        } else {
          throw err
        }
      }
    },
    [pairRepository]
  )

  return [pairs, getPairs]
}
