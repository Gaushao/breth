'use client'

import { breth } from "@repo/srv"
import { LocalStorageWalletProvider, useLocalStorageWalletContext } from "@repo/ui"
import { KeyPassForm, PasswordForm } from "../form"
import { isPrivateKey } from "../../utils"

function Decryption() {
  const {
    decrypted,
    resetDecrypt,
    decrypting,
    reset,
    decrypt,
  } = useLocalStorageWalletContext()
  return decrypted ? <>
    <h2>decrypted <button onClick={() => resetDecrypt()}>close</button></h2>
    <h2>private key {decrypted.privateKey}</h2>
  </> : decrypting ? 'decrypting...' : <>
    <h2>encrypted <button onClick={reset}>remove</button></h2>
    <h2><PasswordForm
      onSubmit={({ password }) => decrypt(password)}
      submit={{ children: 'open' }}
    /></h2>
  </>
}

function Encryption() {
  const {
    encrypted,
    encrypting,
    resetEncrypt,
    encrypt,
  } = useLocalStorageWalletContext()
  return encrypted ? <Decryption /> : encrypting ? 'encrypting...' : <h2>
    <KeyPassForm onSubmit={({ key, password }) => (key && isPrivateKey(key))
      ? breth.loadWallet(key).encrypt(password).then(s => {
        resetEncrypt(JSON.parse(s))
      }) : encrypt(password)} submit={{ children: 'create' }} />
  </h2>
}

function Addresses() {
  const { wallets, selected, select } = useLocalStorageWalletContext()
  return wallets.filter(w => w.address !== selected?.address).map(w => <h2 key={w.address}>
    {w.address} <button onClick={() => { select(w.address) }}>select</button>
  </h2>)
}

function Create() {
  const { phrase, add } = useLocalStorageWalletContext()
  return phrase ? <>
    <h2>phrase</h2>
    <p>{phrase}</p>
    <h2><PasswordForm onSubmit={add} submit={{ children: 'add' }} /></h2>
  </> : null
}

function Content() {
  const { address } = useLocalStorageWalletContext()
  return <>
    <h1>local storage wallet</h1>
    {address && <h2>address {address}</h2>}
    <Encryption />
    <Create />
    <Addresses />
  </>
}

const LocalStorageWallet = () => <LocalStorageWalletProvider><Content /></LocalStorageWalletProvider>

export default LocalStorageWallet