export type AccessToken = {
  access: string
}

export type User = {
  id: number
  username: string
  first_name: string
  last_name: string
  role: string
  email: string
  is_superuser: boolean
}

export type QueryResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type Equipment = {
  id: number
  name: string
  type: string
  model: string
  serial_number: string
  location: string
  status: string
  date_purchased: Date
  warranty_expiration: Date
  manufacturer: string
}

export type RegEquipment = Omit<Equipment, 'id' | 'manufacturer'> & {
  id?: number
  manufacturer: number
}

export type EquipmentAssignment = {
  id?: number
  equipment: string
  user: string
  assignment_date: Date
  return_date: Date
}

export type RegEquipmentAssignment = Pick<
  EquipmentAssignment,
  'assignment_date' | 'return_date' | 'id'
> & { equipment: number; user: number }

export type Manufacturer = {
  id?: number
  name: string
  country: string
}

export type Report = {
  id?: number
  report_date: Date
  equipment: string
  user: string
  report_text: string
}

export type RegReport = Omit<Report, 'equipment' | 'user'> & {
  equipment: number
  user: number
}

export type Maintenance = {
  id?: number
  equipment: string
  maintenance_date: Date
  maintenance_type: string
  cost: number
  technician: string
  notes: string
}

export type RegMaintenance = Omit<Maintenance, 'equipment' | 'technician'> & {
  equipment: number
  technician: number
}
