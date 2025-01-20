import { breth } from "@repo/srv"
import { useAsyncOnChange } from "./useAsync"

export function useBrethBalance(address?: string) {
  return useAsyncOnChange(addr => breth.getBalance(addr), [address])
}
