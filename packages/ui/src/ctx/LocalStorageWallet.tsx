'use client'

import { createContext, PropsWithChildren, use } from "react"
import { useLocalWalletStorage } from "../hooks"

const LocalStorageWalletContext = createContext({} as ReturnType<typeof useLocalWalletStorage>)

const Provider = ({ children }: PropsWithChildren<unknown>) => <LocalStorageWalletContext.Provider
  value={useLocalWalletStorage()}>{children}</LocalStorageWalletContext.Provider>

export const LocalStorageWalletProvider = (
  p: Parameters<typeof Provider>[0]
) => typeof window === 'undefined' ? null : <Provider {...p} />

export const useLocalStorageWalletContext = () => use(LocalStorageWalletContext)