import { screen } from '@testing-library/react'
import { userApi } from 'api/user-api'
import { renderWithRouterAndProvider } from 'tests/helpers'

import { Header } from './header'

describe('Header test', () => {
  let mockGet: ReturnType<typeof jest.spyOn>
  let accessToken: string | null

  beforeAll(() => {
    accessToken = localStorage.getItem('access')
  })

  beforeEach(() => {
    jest.resetAllMocks()
    mockGet = jest.spyOn(userApi, 'useGetUserQuery')
  })

  it(`Have access token`, async () => {
    localStorage.setItem('access', '123')
    mockGet.mockReturnValue({ data: { username: 'test' }, isSuccess: true })

    renderWithRouterAndProvider(<Header />)

    expect(await screen.findByTestId(/username-button/)).toBeInTheDocument()
    expect(screen.getByTestId(/sign-out-button/)).toBeInTheDocument()
    expect(mockGet).toHaveBeenCalledTimes(1)
  })

  it(`Haven't access token`, () => {
    localStorage.removeItem('access')

    renderWithRouterAndProvider(<Header />)

    expect(screen.queryByTestId(/username-button/)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/sign-out-button/)).not.toBeInTheDocument()
  })

  afterAll(() => {
    if (accessToken) {
      localStorage.setItem('access', accessToken || '')
    } else {
      localStorage.removeItem('access')
    }
  })
})
