import { ServerSidePageComponentProps } from "@repo/ui"
import { getAddress } from "../../../utils"
import { breth } from "@repo/srv"

async function WalletBalance({ address }: { address: string }) {
  return <p>balance {await breth.provider.getBalance(address)}</p>
}

export default async function WalletPage(props: ServerSidePageComponentProps<{ address: string }>) {
  const addr = (await props.params).address
  const address = getAddress(addr)
  return <div>
    <h1>Wallet</h1>
    <p>address {address || addr}</p>
    {address ? <WalletBalance address={address} /> : <p>invalid address</p>}
  </div>
}
