import { NextRequest } from "next/server"
import { breth } from "@repo/srv"
import { getAddress } from "../../../../utils"

export async function GET(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl
    const address = getAddress(pathname.split('/')[2])
    if (!address) return new Response("bad address", { status: 400 })
    const balance = await breth.provider.getBalance(address)
    if (Number.isNaN(balance)) return new Response("address not found", { status: 404 })
    return Response.json(balance.toString())
  } catch (error) {
    return Response.json(error)
  }
}
