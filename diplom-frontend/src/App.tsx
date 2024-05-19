import './App.css'

import { CircularProgress } from '@mui/material'
import { userApi } from 'api/user-api'
import { LoginForm } from 'components/login-from'
import { RegisterForm } from 'components/register-from'
import { useLocalStorage } from 'hooks/localstorage'
import { AuthPage } from 'pages/auth'
import { Navigate, Route, Routes } from 'react-router-dom'

export const App = () => {
  const isAuthorized = useLocalStorage()

  const { isLoading, isSuccess, isError } = userApi.useGetUserQuery(undefined, {
    skip: !isAuthorized,
  })

  return (
    <>
      {isLoading && <CircularProgress />}
      <Routes>
        {isError && (
          <Route path='/' element={<AuthPage />}>
            <Route index element={<Navigate to={'sign-in'} replace />} />
            <Route path='sign-in' element={<LoginForm />} />
            <Route path='sign-up' element={<RegisterForm />} />
          </Route>
        )}
        <Route
          path='*'
          element={<Navigate to={isSuccess ? 'main' : 'sign-in'} replace />}
        />
      </Routes>
    </>
  )
}
