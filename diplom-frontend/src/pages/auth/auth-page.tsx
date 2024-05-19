import { Container } from '@mui/material'
import { SelectLanguage } from 'components/select-language'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './auth-page.styled'

export const AuthPage: FC = () => (
  <Container component='main' maxWidth='sm' sx={{ position: 'relative' }}>
    <Header>
      <SelectLanguage />
    </Header>
    <Outlet />
  </Container>
)
