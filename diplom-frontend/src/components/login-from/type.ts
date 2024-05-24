import { User } from 'type'

export type LoginData = {
  password: string
} & Pick<User, 'username'>
