import { RegEquipmentAssignment } from 'type'

type InputsData = {
  name: keyof RegEquipmentAssignment
  type?: string
}

export const inputsData: InputsData[] = [
  {
    name: 'equipment',
    type: 'number',
  },
  {
    name: 'user',
    type: 'number',
  },
  {
    name: 'assignment_date',
    type: 'date',
  },
  {
    name: 'return_date',
    type: 'date',
  },
]
