import { CircularProgress } from '@mui/material'
import { userApi } from 'api'
import { Filters } from 'components/filter'
import { ModalWindow } from 'components/modal'
import { RegisterForm } from 'components/register-from'
import { CustomTable } from 'components/table'
import { useQuery, useUserData } from 'hooks'
import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'type'

import { StyledButton, Wrapper } from './user-table.styled'

const LIMIT = 5

const filterData = [
  {
    label: 'userTable.username',
    key: 'username',
  },
  {
    label: 'userTable.email',
    key: 'email',
  },
  {
    label: 'userTable.role',
    key: 'role',
  },
]

export const UserTable: FC = () => {
  const { t } = useTranslation()
  const { data: user } = useUserData()
  const {
    page,
    setPage,
    isOpenModal,
    setIsOpenModal,
    maxPage,
    data: users,
    isVisibilityKey,
    isFetching,
  } = useQuery<User>(LIMIT, userApi.useGetUsersQuery)

  const [deleteUser] = userApi.useDeleteUserMutation()

  const isVisibilityKeyUser = useCallback(
    (key: string) => isVisibilityKey(key) && key !== 'is_superuser',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Wrapper>
      {user?.is_superuser && (
        <StyledButton onClick={() => setIsOpenModal(true)} variant='contained'>
          {t('userTable.addEmployees')}
        </StyledButton>
      )}
      <Filters filterData={filterData} />
      {isFetching && <CircularProgress />}
      {!isFetching && !!users?.length && (
        <CustomTable
          data={users}
          isVisibilityKey={isVisibilityKeyUser}
          translateBase='userTable'
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          deleteObj={deleteUser}
        />
      )}
      <ModalWindow open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <RegisterForm />
      </ModalWindow>
    </Wrapper>
  )
}
