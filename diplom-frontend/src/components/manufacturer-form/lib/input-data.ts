import { Manufacturer } from 'type'

type InputsData = {
  name: keyof Manufacturer
  type?: string
}

export const inputsData: InputsData[] = [
  {
    name: 'name',
  },
  {
    name: 'country',
  },
]
