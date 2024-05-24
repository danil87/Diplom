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

export type QueryResponse = {
  count: number
  next: string | null
  previous: string | null
}
