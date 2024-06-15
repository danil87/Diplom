import { User } from 'type'

export type RegisterData = Omit<User, 'id'> & {
  id?: number
  password: string
}
