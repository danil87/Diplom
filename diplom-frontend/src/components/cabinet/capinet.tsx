import { UserForm } from 'components/user-form'
import { useUserData } from 'hooks'
import { FC } from 'react'

import { Wrapper } from './cabinet.styled'

export const Cabinet: FC = () => {
  const { data: user } = useUserData()

  return <Wrapper>{user && <UserForm user={user} />}</Wrapper>
}
