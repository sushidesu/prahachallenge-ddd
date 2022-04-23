import { useCallback, useState } from "react"

export const useInput = (
  defaultValue?: string
): [string, React.ChangeEventHandler<HTMLInputElement>] => {
  const [text, setText] = useState<string>(defaultValue ?? "")
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setText(e.target.value)
    },
    []
  )
  return [text, handleChange]
}
