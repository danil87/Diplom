import { CircularProgress } from '@mui/material'
import { equipmentAssignmentApi } from 'api'
import { EquipmentAssignmentForm } from 'components/equipment-assignment-form'
import { Filters } from 'components/filter'
import { ModalWindow } from 'components/modal'
import { CustomTable } from 'components/table'
import { useQuery, useUpdateOrCreate, useUserData } from 'hooks'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { EquipmentAssignment, RegEquipmentAssignment } from 'type'

import { StyledButton, Wrapper } from './equipment-assignment-table.styled'

const LIMIT = 5

const filterData = [
  {
    label: 'equipmentAssignmentList.equipment',
    key: 'equipment',
  },
  {
    label: 'equipmentAssignmentList.user',
    key: 'user',
  },
  {
    label: 'equipmentAssignmentList.assignment_date',
    key: 'assignment_date',
  },
  {
    label: 'equipmentAssignmentList.return_date',
    key: 'return_date',
  },
]
export const EquipmentAssignmentTable: FC = () => {
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
  } = useQuery<EquipmentAssignment>(
    LIMIT,
    equipmentAssignmentApi.useGetEquipmentsQuery
  )
  const [deleteEq] = equipmentAssignmentApi.useDeleteEquipmentMutation()

  const props = useUpdateOrCreate<RegEquipmentAssignment>(
    equipmentAssignmentApi.useCreateEquipmentMutation,
    equipmentAssignmentApi.useChangeEquipmentMutation
  )

  const [getEq, { data: equipment, reset }] =
    equipmentAssignmentApi.useGetOneEquipmentMutation()

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
          {t('equipmentAssignmentList.addEquipmentAssignment')}
        </StyledButton>
      )}
      <Filters filterData={filterData} />
      {isFetching && <CircularProgress />}
      {!isFetching && !!equipments?.length && (
        <CustomTable
          data={equipments}
          isVisibilityKey={isVisibilityKey}
          translateBase='equipmentAssignmentList'
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          deleteObj={user?.is_superuser ? deleteEq : undefined}
          setId={user?.is_superuser ? getEq : undefined}
        />
      )}
      <ModalWindow
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        {...props}
      >
        <EquipmentAssignmentForm {...props} equipmentAssignment={equipment} />
      </ModalWindow>
    </Wrapper>
  )
}
