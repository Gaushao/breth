import { JsonRpcProvider, Wallet, HDNodeWallet } from "ethers"
import { PUBLIC_RPC_URL } from "@repo/env/"

export default class BrethService {

  static Provider = class Provider extends JsonRpcProvider {
    constructor() {
      super(PUBLIC_RPC_URL)
    }
  }

  get provider() { return new BrethService.Provider() }
  get createRandomWallet() { return Wallet.createRandom(this.provider).deriveChild(0) }
  get fromEncryptedJsonWallet() { return Wallet.fromEncryptedJson }
  loadWallet(key: string) { return new Wallet(key, this.provider) }
  fromPhrase(phrase: string) { return HDNodeWallet.fromPhrase(phrase) }
}