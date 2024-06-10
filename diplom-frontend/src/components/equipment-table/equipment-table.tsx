import { CircularProgress } from '@mui/material'
import { equipmentApi } from 'api'
import { Filters } from 'components/filter'
import { ModalWindow } from 'components/modal'
import { RegisterForm } from 'components/register-from'
import { CustomTable } from 'components/table'
import { useQuery, useUserData } from 'hooks'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Equipment } from 'type'

import { StyledButton, Wrapper } from './equipment-table.styled'

const LIMIT = 5

const filterData = [
  {
    label: 'equipmentList.serial_number',
    key: 'serial_number',
  },
  {
    label: 'equipmentList.manufacturer',
    key: 'manufacturer',
  },
  {
    label: 'equipmentList.location',
    key: 'location',
  },
  {
    label: 'equipmentList.type',
    key: 'serial_number',
  },
  {
    label: 'equipmentList.date_purchased',
    key: 'manufacturer',
  },
  {
    label: 'equipmentList.status',
    key: 'location',
  },
  {
    label: 'equipmentList.warranty_expiration',
    key: 'location',
  },
]

export const EquipmentTable: FC = () => {
  const { t } = useTranslation()
  const { data: user } = useUserData()
  const {
    page,
    setPage,
    isOpenModal,
    setIsOpenModal,
    maxPage,
    data: equipments,
    isVisibilityKey,
    isFetching,
  } = useQuery<Equipment>(LIMIT, equipmentApi.useGetEquipmentsQuery)

  const [deleteEq] = equipmentApi.useDeleteEquipmentMutation()

  return (
    <Wrapper>
      {user?.is_superuser && (
        <StyledButton onClick={() => setIsOpenModal(true)} variant='contained'>
          {t('equipmentList.addEquipment')}
        </StyledButton>
      )}
      <Filters filterData={filterData} />
      {isFetching && <CircularProgress />}
      {!isFetching && !!equipments?.length && (
        <CustomTable
          data={equipments}
          isVisibilityKey={isVisibilityKey}
          translateBase='equipmentList'
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          deleteObj={deleteEq}
        />
      )}
      <ModalWindow open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <RegisterForm />
      </ModalWindow>
    </Wrapper>
  )
}
