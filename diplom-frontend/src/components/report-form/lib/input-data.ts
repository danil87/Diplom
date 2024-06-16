import { Report } from 'type'

type InputsData = {
  name: keyof Omit<Report, 'id'>
  type?: string
}

export const inputsData: InputsData[] = [
  {
    name: 'equipment',
  },
  // {
  //   name: 'user',
  // },
  // {
  //   name: 'report_date',
  //   type: 'date',
  // },
  {
    name: 'report_text',
    type: 'textarea',
  },
]
