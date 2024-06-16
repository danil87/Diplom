import { RegisterData } from '../type'

type InputsData = {
  name: keyof RegisterData
}

export const inputsData: InputsData[] = [
  {
    name: 'first_name',
  },
  {
    name: 'last_name',
  },
  {
    name: 'email',
  },
  {
    name: 'username',
  },
  {
    name: 'password',
  },
  {
    name: 'role',
  },
  {
    name: 'is_superuser',
  },
]
