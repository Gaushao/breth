'use client'

import { useEffect, useRef, useState } from "react"
import { breth } from '@repo/srv'
import { useAsync } from "./useAsync"

class ClientLocalStorage {
  static get storage() {
    return typeof window === 'undefined' ? null : localStorage
  }

  _key = ''

  get data() {
    return ClientLocalStorage.storage?.getItem(this._key)
  }
  set save(data: string) {
    ClientLocalStorage.storage?.setItem(this._key, data)
  }
  get empty() {
    ClientLocalStorage.storage?.removeItem(this._key)
    return this.data
  }

  constructor(key: string) {
    this._key = key
  }
}

export function useLocalStorage<D>(key: string) {
  const { current: storage } = useRef(new ClientLocalStorage(key))
  const initial = storage.data
  const handler = useState<D>(initial ? JSON.parse(initial) : initial)
  const [data] = handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { storage.save = JSON.stringify(data) }, [data])
  return handler
}

type LocalWalletStorage = {
  address: string
  phrase: string
}

export function useLocalWalletStorage() {
  const [_storage, setStorage] = useLocalStorage<LocalWalletStorage[]>('wallet')
  const storage = _storage || []
  const [selected] = storage
  const {
    data: encrypted = selected,
    loading: encrypting,
    fetch: encrypt,
    reset: resetEncrypt,
  } = useAsync(async (p: string): Promise<LocalWalletStorage> => JSON.parse(
    await breth.createRandomWallet.encrypt(p)
  ))
  useEffect(() => {
    if (encrypted) setStorage(curr => curr.find(
      w => w.address === encrypted.address
    ) ? curr : [encrypted, ...(curr || storage)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encrypted])

  const {
    data: decrypted,
    loading: decrypting,
    fetch: decrypt,
    reset: resetDecrypt,
  } = useAsync((password: string) => breth.fromEncryptedJsonWallet(
    JSON.stringify(encrypted) || '', password
  ))
  const find = (address: string) => storage.find(w => w.address === address)
  const remove = (address: string) => {
    setStorage(curr => curr.filter(w => w.address !== address))
  }
  const add = async ({ password }: { password: string }) => {
    const derived = breth.deriveChild(storage.length, decrypted)
    if (!derived) return
    const encrypted = await derived.encrypt(password)
    const w: LocalWalletStorage = typeof encrypted === 'string' ? JSON.parse(encrypted) : encrypted
    setStorage(curr => curr.find(stored => stored.address === w.address) ? curr : [w, ...curr])
  }
  const reset = () => {
    resetEncrypt()
    resetDecrypt()
    setStorage([])
  }
  const address = selected?.address
  const phrase = breth.getPhrase(decrypted)
  return {
    wallets: storage,
    selected,
    address,
    encrypted,
    decrypted,
    resetDecrypt,
    decrypting,
    reset,
    decrypt,
    encrypting,
    resetEncrypt,
    encrypt,
    phrase,
    find,
    add,
    remove,
    clear: () => setStorage([]),
    select: (address: string) => {
      setStorage(curr => {
        const found = curr.find(w => w.address === address)
        return found ? [found, ...curr] : curr
      })
      const found = find(address)
      if (!found) return
      if (storage[0]?.address === address) return
      const unselected = storage.filter(wallet => wallet.address !== address)
      setStorage([found, ...unselected])
      if (found) return found
    }
  }

}
