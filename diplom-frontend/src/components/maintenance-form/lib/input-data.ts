import { Maintenance } from 'type'

type InputsData = {
  name: keyof Omit<Maintenance, 'id'>
  type?: string
}

export const inputsData: InputsData[] = [
  {
    name: 'equipment',
  },
  {
    name: 'technician',
  },
  {
    name: 'maintenance_date',
    type: 'date',
  },
  {
    name: 'maintenance_type',
  },
  {
    name: 'cost',
    type: 'number',
  },
  {
    name: 'notes',
  },
]
