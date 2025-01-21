import { breth } from "@repo/srv"
import { useAsyncOnChange } from "./useAsync"

export function useBrethBalance(address?: string) {
  return useAsyncOnChange(async addr => (await breth.getBalance(addr)).toString(), [address])
}
