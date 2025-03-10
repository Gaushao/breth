import { ButtonHTMLAttributes, FormHTMLAttributes, PropsWithChildren } from "react"
import * as Inputs from './Inputs'

type Props<F> = PropsWithChildren<{
  submit: (form: F) => void
}> & FormHTMLAttributes<HTMLFormElement>

export default function Form<F extends { [k: string]: string }>({ children, submit, ...props }: Props<F>) {
  return <form onSubmit={e => {
    e.preventDefault()
    submit(Object.fromEntries(
      Array.from(new FormData(e.currentTarget)).map(([key, value]) => [key, value.toString()])
    ) as F)
  }} {...props}>
    {children}
  </form>
}

const SubmitButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => <button type="submit" {...props} />

type SubmitButtonProps = Parameters<typeof SubmitButton>[0]

const getValue = (key: string) => (f: FormData) => Object.fromEntries(f)[key]

Form.getValue = getValue

export { Inputs }

const { KeyInput, TextInput, PasswordInput } = Inputs

type CustomFormProps<F> = {
  button?: SubmitButtonProps
  submit: (form: F) => void
}

type PasswordFormFields = { password: string }

export function PasswordForm({ submit, button }: CustomFormProps<PasswordFormFields>) {
  return <Form<PasswordFormFields> submit={submit}>
    <PasswordInput />
    <SubmitButton {...button} />
  </Form>
}

type KeyPassFormFields = { key: string } & PasswordFormFields

export function KeyPassForm({ submit, button }: CustomFormProps<KeyPassFormFields>) {
  return <Form<KeyPassFormFields> submit={submit}>
    <KeyInput />
    <PasswordInput />
    <SubmitButton {...button} />
  </Form>
}

type TransferFormFields = { value: string; to: string } & PasswordFormFields

export function TransferForm({ submit, button }: CustomFormProps<TransferFormFields>) {
  return <Form<TransferFormFields> submit={submit}>
    <TextInput name='value' />
    <TextInput name='to' />
    <PasswordInput />
    <SubmitButton {...button} />
  </Form>
}
