import { Header } from 'components/header'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { FromContainer, Wrapper } from './auth-page.styled'

export const AuthPage: FC = () => (
  <>
    <Header />
    <Wrapper>
      <FromContainer maxWidth='sm'>
        <Outlet />
      </FromContainer>
    </Wrapper>
  </>
)
