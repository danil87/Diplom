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
  data_purchased: Date
  warranty_expiration: Date
  manufacturer: string
}
