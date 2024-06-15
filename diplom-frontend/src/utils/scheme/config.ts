import { bool, date, number, object, string } from 'yup'

export const passwordScheme = string()
  .required('validate.required')
  .min(8, 'validate.passwordLength')
export const usernameScheme = string().required('validate.required')
export const emailScheme = string()
  .required('validate.required')
  .email('validate.emailIncorrect')
export const roleScheme = string().required('validate.required')
export const isSuperUserScheme = bool().required('validate.required')

export const sharedString = string().required('validate.required')
export const sharedNumber = number().required('validate.required')
export const sharedDate = date()
  .required('validate.required')
  .typeError('validate.date')

export const loginScheme = object({
  password: passwordScheme,
  username: usernameScheme,
})

export const registerScheme = object({
  password: passwordScheme,
  username: usernameScheme,
  first_name: usernameScheme,
  last_name: usernameScheme,
  role: roleScheme,
  is_superuser: isSuperUserScheme,
  email: emailScheme,
})

export const equipmentScheme = object({
  name: sharedString,
  type: sharedString,
  model: sharedString,
  serial_number: sharedString,
  location: sharedString,
  status: sharedString,
  date_purchased: sharedDate,
  warranty_expiration: sharedDate,
  manufacturer: sharedNumber,
})

export const manufacturerSchema = object({
  name: sharedString,
  country: sharedString,
})
