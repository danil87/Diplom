import { User } from 'type'

type InputData = {
  name: keyof User
}

export const inputsData: InputData[] = [
  {
    name: 'first_name',
  },
  {
    name: 'last_name',
  },
  {
    name: 'username',
  },
  {
    name: 'email',
  },
  {
    name: 'role',
  },
]
