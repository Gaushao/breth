import { ethers } from "ethers"

export function getAddress(address?: string) {
  if (ethers.isAddress(address)) return address
  const addr0x = '0x' + address
  if (ethers.isAddress(addr0x)) return addr0x
  return null
}