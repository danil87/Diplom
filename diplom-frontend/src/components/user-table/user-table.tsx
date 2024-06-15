import { CircularProgress } from '@mui/material'
import { authApi, userApi } from 'api'
import { Filters } from 'components/filter'
import { ModalWindow } from 'components/modal'
import { RegisterForm } from 'components/register-from'
import { CustomTable } from 'components/table'
import { useQuery, useUserData } from 'hooks'
import { FC, useCallback, useEffect } from 'react'
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

  const [
    ,
    { isSuccess: isSuccessCreate, isError: isErrorCreate, error: errorCreate },
  ] = authApi.useRegisterMutation({
    fixedCacheKey: 'register-user',
  })

  const [
    updateFn,
    { isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = userApi.useUpdateUserMutation()

  const [deleteUser] = userApi.useDeleteUserMutation()

  const [getUser, { data: userData, reset }] = userApi.useGetOneUserMutation()

  const isVisibilityKeyUser = useCallback(
    (key: string) => isVisibilityKey(key) && key !== 'is_superuser',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (userData) {
      setIsOpenModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    if (!isOpenModal && userData) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal])

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
          setId={getUser}
        />
      )}
      <ModalWindow
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        isSuccess={isSuccessCreate || isSuccessUpdate}
        isError={isErrorCreate || isErrorUpdate}
        error={errorCreate || errorUpdate}
      >
        <RegisterForm updateUser={updateFn} userData={userData} />
      </ModalWindow>
    </Wrapper>
  )
}
