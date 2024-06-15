import { CircularProgress } from '@mui/material'
import { manufacturerApi } from 'api'
import { Filters } from 'components/filter'
import { ManufacturerForm } from 'components/manufacturer-form'
import { ModalWindow } from 'components/modal'
import { CustomTable } from 'components/table'
import { useQuery, useUpdateOrCreate, useUserData } from 'hooks'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Manufacturer } from 'type'

import { StyledButton, Wrapper } from './manufacturer-table.styled'

const LIMIT = 5

const filterData = [
  {
    label: 'manufacturerList.name',
    key: 'name',
  },
  {
    label: 'manufacturerList.country',
    key: 'country',
  },
]

export const ManufacturerTable: FC = () => {
  const { t } = useTranslation()
  const { data: user } = useUserData()
  const {
    page,
    setPage,
    isOpenModal,
    setIsOpenModal,
    maxPage,
    data: manufacturers,
    isVisibilityKey,
    isFetching,
  } = useQuery<Manufacturer>(LIMIT, manufacturerApi.useGetManufacturersQuery)

  const [deleteMn] = manufacturerApi.useDeleteManufacturerMutation()

  const props = useUpdateOrCreate<Manufacturer>(
    manufacturerApi.useCreateManufacturerMutation,
    manufacturerApi.useUpdateManufacturerMutation
  )

  const [getManufacturer, { data: manufacturer, reset }] =
    manufacturerApi.useGetOneManufacturerMutation()

  useEffect(() => {
    if (manufacturer) {
      setIsOpenModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manufacturer])

  useEffect(() => {
    if (!isOpenModal && manufacturer) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal])

  return (
    <Wrapper>
      {user?.is_superuser && (
        <StyledButton onClick={() => setIsOpenModal(true)} variant='contained'>
          {t('manufacturerList.addManufacturer')}
        </StyledButton>
      )}
      <Filters filterData={filterData} />
      {isFetching && <CircularProgress />}
      {!isFetching && !!manufacturers?.length && (
        <CustomTable
          data={manufacturers}
          isVisibilityKey={isVisibilityKey}
          translateBase='manufacturerList'
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          deleteObj={deleteMn}
          setId={getManufacturer}
        />
      )}
      <ModalWindow
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        {...props}
      >
        <ManufacturerForm {...props} manufacturer={manufacturer} />
      </ModalWindow>
    </Wrapper>
  )
}
