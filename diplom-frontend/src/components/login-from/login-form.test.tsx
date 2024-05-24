import { fireEvent, screen } from '@testing-library/react'
import { userApi } from 'api/user-api'
import { act } from 'react'
import { renderWithRouterAndProvider } from 'tests/helpers'

import { LoginForm } from './login-form'

describe('Login form tests', () => {
  let mockGetUser: ReturnType<typeof jest.spyOn>

  beforeEach(() => {
    jest.resetAllMocks()
    mockGetUser = jest.spyOn(userApi, 'useGetUserQuery')
  })

  it('Button is disabled', () => {
    mockGetUser.mockReturnValue({ isLoading: false, data: null })

    renderWithRouterAndProvider(<LoginForm />)

    const button = screen.getByTestId(/login-button/)

    expect(screen.getByTestId(/username-input/)).toBeInTheDocument()
    expect(screen.getByTestId(/password-input/)).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(screen.getByTestId(/form-login/)).toMatchSnapshot()
  })

  it('The password has less than 8 characters', async () => {
    mockGetUser.mockReturnValue({ isLoading: false, data: null })

    renderWithRouterAndProvider(<LoginForm />)

    const usernameInput: HTMLInputElement = screen.getByTestId(/username-input/)
    const passwordInput: HTMLInputElement = screen.getByTestId(/password-input/)
    const button = screen.getByTestId(/login-button/)

    await act(async () => {
      fireEvent.input(usernameInput, { target: { value: 'admin' } })
      fireEvent.input(passwordInput, { target: { value: '1111' } })
      fireEvent.blur(usernameInput)
      fireEvent.blur(passwordInput)
    })

    expect(usernameInput.value).toBe('admin')
    expect(passwordInput.value).toBe('1111')
    expect(button).toBeDisabled()
    expect(screen.getByTestId(/form-login/)).toMatchSnapshot()
  })

  it('The password has 8 characters', async () => {
    mockGetUser.mockReturnValue({ isLoading: false, data: null })

    renderWithRouterAndProvider(<LoginForm />)

    const usernameInput: HTMLInputElement = screen.getByTestId(/username-input/)
    const passwordInput: HTMLInputElement = screen.getByTestId(/password-input/)
    const button = screen.getByTestId(/login-button/)

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: '11111111' } })
      fireEvent.blur(usernameInput)
      fireEvent.blur(passwordInput)
    })

    expect(usernameInput.value).toBe('admin')
    expect(passwordInput.value).toBe('11111111')
    expect(button).not.toBeDisabled()
    expect(screen.getByTestId(/form-login/)).toMatchSnapshot()
  })

  it('The password has 8 characters and empty username', async () => {
    mockGetUser.mockReturnValue({ isLoading: false, data: null })

    renderWithRouterAndProvider(<LoginForm />)

    const passwordInput: HTMLInputElement = screen.getByTestId(/password-input/)
    const button = screen.getByTestId(/login-button/)

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: '11111111' } })
      fireEvent.blur(passwordInput)
    })

    expect(screen.getByTestId(/username-input/)).toBeInTheDocument()
    expect(passwordInput.value).toBe('11111111')
    expect(button).toBeDisabled()
    expect(screen.getByTestId(/form-login/)).toMatchSnapshot()
  })
})
