import { Equipment } from 'type'

type InputsData = {
  name: keyof Omit<Equipment, 'id'>
  type?: string
}

export const inputsData: InputsData[] = [
  {
    name: 'name',
  },
  {
    name: 'serial_number',
  },
  {
    name: 'model',
  },
  {
    name: 'manufacturer',
  },
  {
    name: 'type',
  },
  {
    name: 'location',
  },
  {
    name: 'status',
  },
  {
    name: 'date_purchased',
    type: 'date',
  },
  {
    name: 'warranty_expiration',
    type: 'date',
  },
]
