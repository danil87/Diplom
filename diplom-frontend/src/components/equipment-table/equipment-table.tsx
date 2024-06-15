import { CircularProgress } from '@mui/material'
import { equipmentApi } from 'api'
import { EquipmentForm } from 'components/equipment-form'
import { Filters } from 'components/filter'
import { ModalWindow } from 'components/modal'
import { CustomTable } from 'components/table'
import { useQuery, useUpdateOrCreate, useUserData } from 'hooks'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Equipment, RegEquipment } from 'type'

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
    key: 'type',
  },
  {
    label: 'equipmentList.date_purchased',
    key: 'date_purchased',
  },
  {
    label: 'equipmentList.status',
    key: 'status',
  },
  {
    label: 'equipmentList.warranty_expiration',
    key: 'warranty_expiration',
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

  const props = useUpdateOrCreate<RegEquipment>(
    equipmentApi.useCreateEquipmentMutation,
    equipmentApi.useChangeEquipmentMutation
  )

  const [getEq, { data: equipment, reset }] =
    equipmentApi.useGetOneEquipmentMutation()

  useEffect(() => {
    if (equipment) {
      setIsOpenModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment])

  useEffect(() => {
    if (!isOpenModal && equipment) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal])

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
          setId={getEq}
        />
      )}
      <ModalWindow
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        {...props}
      >
        <EquipmentForm {...props} equipment={equipment} />
      </ModalWindow>
    </Wrapper>
  )
}
