import './App.css'

import { CircularProgress } from '@mui/material'
import { StyledBox } from 'App.styled'
import { Cabinet } from 'components/cabinet'
import { EquipmentAssignmentTable } from 'components/equipment-assignment-table'
import { EquipmentTable } from 'components/equipment-table'
import { LoginForm } from 'components/login-from'
import { MaintenanceTable } from 'components/maintenance-table'
import { ManufacturerTable } from 'components/manufacturer-table/manufacturer-table'
import { RegisterForm } from 'components/register-from'
import { ReportTable } from 'components/report-table'
import { UserTable } from 'components/user-table'
import { useUserData } from 'hooks/user'
import { AuthPage } from 'pages/auth'
import { MainPage } from 'pages/main/main-page'
import { Navigate, Route, Routes } from 'react-router-dom'

export const App = () => {
  const { isAccessToken, isLoading, isSuccess } = useUserData()

  return (
    <>
      {isLoading && (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      )}
      <Routes>
        {isSuccess && (
          <Route path='/' element={<MainPage />}>
            <Route path='employees' element={<UserTable />} />
            <Route path='equipment' element={<EquipmentTable />} />
            <Route path='manufacturer' element={<ManufacturerTable />} />
            <Route
              path='equipment-assignment'
              element={<EquipmentAssignmentTable />}
            />
            <Route path='report' element={<ReportTable />} />
            <Route path='maintenance' element={<MaintenanceTable />} />
            <Route path='cabinet' element={<Cabinet />} />
          </Route>
        )}
        {!isAccessToken && (
          <Route path='/' element={<AuthPage />}>
            <Route index element={<Navigate to={'sign-in'} replace />} />
            <Route path='sign-in' element={<LoginForm />} />
            <Route path='sign-up' element={<RegisterForm />} />
          </Route>
        )}
        {(isSuccess || !isAccessToken) && (
          <Route
            path='*'
            element={
              <Navigate to={isSuccess ? 'employees' : 'sign-in'} replace />
            }
          />
        )}
      </Routes>
    </>
  )
}
