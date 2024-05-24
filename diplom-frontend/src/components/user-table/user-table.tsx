import { CircularProgress, Pagination } from '@mui/material'
import { userApi } from 'api/user-api'
import { ModalWindow } from 'components/modal'
import { RegisterForm } from 'components/register-from'
import { CustomTable } from 'components/table'
import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { User } from 'type'

import { StyledButton, Wrapper } from './user-table.styled'

const LIMIT = 10

export const UserTable: FC = () => {
  const { t } = useTranslation()
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(0)
  const [params, setParams] = useSearchParams()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { data: user } = userApi.useGetUserQuery()

  const { isLoading, data, refetch } = userApi.useGetUsersQuery(
    params.toString(),
    {
      skip: !params.toString(),
    }
  )

  const isVisibilityKey = useCallback(
    (key: string) => key !== 'id' && key !== 'is_superuser',
    []
  )

  useEffect(() => {
    if (data) {
      const { results, count } = data
      setUsers(results)
      setMaxPage(Math.ceil(count / LIMIT))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    params.set('limit', LIMIT + '')
    params.set('offset', (page - 1) * LIMIT + '')
    setParams(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (data) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <Wrapper>
      {user?.is_superuser && (
        <StyledButton onClick={() => setIsOpenModal(true)} variant='contained'>
          {t('userTable.addEmployees')}
        </StyledButton>
      )}
      {isLoading && <CircularProgress />}
      {!!users.length && (
        <>
          <CustomTable
            data={users}
            isVisibilityKey={isVisibilityKey}
            translateBase='userTable'
          />
          <Pagination
            color='primary'
            page={page}
            onChange={(_, page) => setPage(page)}
            count={maxPage}
          />
        </>
      )}
      <ModalWindow open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <RegisterForm />
      </ModalWindow>
    </Wrapper>
  )
}
