import { LoginData } from 'components/login-from'

export type RegisterData = {
  firstName: string
  lastName: string
  role: string
  email: string
  isSuperUser: boolean
} & LoginData
