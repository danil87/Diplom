import { User } from 'type'

export type RegisterData = {
  password: string
} & Omit<User, 'id'>
