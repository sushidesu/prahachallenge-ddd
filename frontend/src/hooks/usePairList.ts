import { useCallback, useState } from "react"
import { Pair } from "../domain/pair/pair"
import { IPairRepository } from "../domain/pair/pair-repository-interface"

type Loadable<T> =
  | {
      type: "default"
    }
  | {
      type: "loading"
    }
  | {
      type: "complete"
      value: T
    }

type GetPairListFunction = () => Promise<void>

type UsePairListResponse = [Loadable<Pair[]>, GetPairListFunction]

export const usePairList = (
  pairRepository: IPairRepository
): UsePairListResponse => {
  const [pairs, setPairs] = useState<Loadable<Pair[]>>({ type: "default" })

  /**
   * pairを取得してstateを更新する
   */
  const getPairs = useCallback(async (): Promise<void> => {
    setPairs({ type: "loading" })
    const result = await pairRepository.getAll()
    setPairs({ type: "complete", value: result })
  }, [pairRepository])

  return [pairs, getPairs]
}
