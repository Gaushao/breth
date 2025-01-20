import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import * as Inputs from './Inputs'

type Props = PropsWithChildren<{
  submit?: ButtonHTMLAttributes<HTMLButtonElement>
  onSubmit: (form: Record<string, string>) => void
}>

export default function Form({ children, submit, onSubmit }: Props) {
  return <form action={form => onSubmit(Object.fromEntries(Array.from(form).map(([key, value]) => [key, value.toString()])))} >
    {children}
    <button type="submit" {...submit} />
  </form>
}

const getValue = (key: string) => (f: FormData) => Object.fromEntries(f)[key]

Form.getValue = getValue

export { Inputs }

const { KeyInput, PasswordInput } = Inputs

export function PasswordForm({ onSubmit, submit }: {
  onSubmit: (fields: {
    password: string
  }) => void; submit?: Props['submit']
}) {
  return <Form submit={submit} onSubmit={f => {
    const password = f[PasswordInput.KEY]
    if (typeof password === 'string') onSubmit({ password })
  }}>
    <PasswordInput />
  </Form>
}

export function KeyPassForm({ onSubmit, submit }: {
  onSubmit: (fields: {
    password: string; key?: string
  }) => void; submit?: Props['submit']
}) {
  return <Form submit={submit} onSubmit={f => {
    const password = f[PasswordInput.KEY]
    const key = f[KeyInput.KEY]
    if (typeof password === 'string') onSubmit({ password, key })
  }}>
    <KeyInput />
    <PasswordInput />
  </Form>
}
