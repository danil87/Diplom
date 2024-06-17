import { CircularProgress } from '@mui/material'
import { maintenanceApi } from 'api'
import { Filters } from 'components/filter'
import { MaintenanceForm } from 'components/maintenance-form'
import { ModalWindow } from 'components/modal'
import { CustomTable } from 'components/table'
import { useQuery, useUpdateOrCreate, useUserData } from 'hooks'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Maintenance, RegMaintenance } from 'type'

import { StyledButton, Wrapper } from './maintenance-table.styled'

const LIMIT = 5

const filterData = [
  {
    label: 'maintenanceList.equipment',
    key: 'equipment',
  },
  {
    label: 'maintenanceList.technician',
    key: 'technician',
  },
  {
    label: 'maintenanceList.maintenance_date',
    key: 'maintenance_date',
  },
]

export const MaintenanceTable: FC = () => {
  const { t } = useTranslation()
  const { data: user } = useUserData()
  const {
    page,
    setPage,
    isOpenModal,
    setIsOpenModal,
    maxPage,
    data: maintenances,
    isVisibilityKey,
    isFetching,
  } = useQuery<Maintenance>(LIMIT, maintenanceApi.useGetMaintenancesQuery)
  const [deleteEq] = maintenanceApi.useDeleteMaintenanceMutation()

  const props = useUpdateOrCreate<RegMaintenance>(
    maintenanceApi.useCreateMaintenanceMutation,
    maintenanceApi.useChangeMaintenanceMutation
  )

  const [getEq, { data: maintenance, reset }] =
    maintenanceApi.useGetOneMaintenanceMutation()

  useEffect(() => {
    if (maintenance) {
      setIsOpenModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maintenance])

  useEffect(() => {
    if (!isOpenModal && maintenance) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal])

  return (
    <Wrapper>
      {user?.is_superuser && (
        <StyledButton onClick={() => setIsOpenModal(true)} variant='contained'>
          {t('maintenanceList.addMaintenance')}
        </StyledButton>
      )}
      <Filters filterData={filterData} />
      {isFetching && <CircularProgress />}
      {!isFetching && !!maintenances?.length && (
        <CustomTable
          data={maintenances}
          isVisibilityKey={isVisibilityKey}
          translateBase='maintenanceList'
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
        <MaintenanceForm {...props} maintenance={maintenance} />
      </ModalWindow>
    </Wrapper>
  )
}
