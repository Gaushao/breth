import { InputHTMLAttributes } from "react"

export function Input(props: {

} & InputHTMLAttributes<HTMLInputElement>) {
  const { id: _id, name } = props
  const id = _id || `input-${name}`
  return <>
    <label htmlFor={id}>{name}</label>
    <input id={id} type={name} {...props} />
  </>
}

const PASSWORD_INPUT_KEY = 'password'

export const PasswordInput = ({ name = PASSWORD_INPUT_KEY, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <Input name={name} type={PASSWORD_INPUT_KEY} {...props} />
}

PasswordInput.KEY = PASSWORD_INPUT_KEY

const KEY_INPUT_KEY = 'key'

export const KeyInput = ({ name = KEY_INPUT_KEY, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <Input name={name} type={PASSWORD_INPUT_KEY} {...props} />
}

KeyInput.KEY = KEY_INPUT_KEY
