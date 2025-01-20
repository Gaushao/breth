'use client'

import { breth, isPrivateKey } from "@repo/srv"
import { LocalStorageWalletCtx, useLocalStorageWalletCtx, useLocalStorageWalletCtxBalance } from "@repo/ui"
import { KeyPassForm, PasswordForm } from "../form"

function Decryption() {
  const {
    decrypted,
    resetDecrypt,
    decrypting,
    reset,
    decrypt,
  } = useLocalStorageWalletCtx()
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
  } = useLocalStorageWalletCtx()
  return encrypted ? <Decryption /> : encrypting ? 'encrypting...' : <h2>
    <KeyPassForm onSubmit={({ key, password }) => (key && isPrivateKey(key))
      ? breth.loadWallet(key).encrypt(password).then(s => {
        resetEncrypt(JSON.parse(s))
      }) : encrypt(password)} submit={{ children: 'create' }} />
  </h2>
}

function Addresses() {
  const { wallets, selected, select } = useLocalStorageWalletCtx()
  return wallets.filter(w => w.address !== selected?.address).map(w => <h2 key={w.address}>
    {w.address} <button onClick={() => { select(w.address) }}>select</button>
  </h2>)
}

function Create() {
  const { phrase, add } = useLocalStorageWalletCtx()
  return phrase ? <>
    <h2>phrase</h2>
    <p>{phrase}</p>
    <h2><PasswordForm onSubmit={add} submit={{ children: 'add' }} /></h2>
  </> : null
}

export function Balance() {
  const { address, balance: { data: balance } } = useLocalStorageWalletCtxBalance()
  if (!address) return null
  return <>
    <h2>address {address}</h2>
    <h2>balance {balance}</h2>
  </>
}

function Content() {
  return <>
    <h1>local storage wallet</h1>
    <Balance />
    <Encryption />
    <Create />
    <Addresses />
  </>
}

const LocalStorageWallet = () => <LocalStorageWalletCtx><Content /></LocalStorageWalletCtx>

export default LocalStorageWallet