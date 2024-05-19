import { bool, object, string } from 'yup'

export const passwordScheme = string()
  .required('validate.required')
  .min(8, 'validate.passwordLength')
export const usernameScheme = string().required('validate.required')
export const emailScheme = string()
  .required('validate.required')
  .email('validate.emailIncorrect')
export const roleScheme = string().required('validate.required')
export const isSuperUserScheme = bool().required('validate.required')

export const loginScheme = object({
  password: passwordScheme,
  username: usernameScheme,
})

export const registerScheme = object({
  password: passwordScheme,
  username: usernameScheme,
  firstName: usernameScheme,
  lastName: usernameScheme,
  role: roleScheme,
  isSuperUser: isSuperUserScheme,
  email: emailScheme,
})
