import { useState } from "react"

/**
 * 
 * @returns ClipboardCopyControls
 * @description
 * Hook that copies the provided text to the clipboard.
 * @example
 * const [copyToClipboard, { success }] = useCopyToClipboard()
 * copyToClipboard("This was copied")
 */
export function useCopyToClipboard(): [
  copyToClipboard: (text: string) => Promise<void>,
  operators: {
    value: string | undefined,
    success: boolean | undefined
  }
] {
  const [value, setValue] = useState<string>()
  const [success, setSuccess] = useState<boolean>()

  const copyToClipboard = async (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setValue(text)
        setSuccess(true)
      })
      .catch(() => {
        setSuccess(false)
      })
  }

  return [copyToClipboard, { value, success }]
}