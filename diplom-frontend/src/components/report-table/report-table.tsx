import { CircularProgress } from '@mui/material'
import { reportApi } from 'api'
import { Filters } from 'components/filter'
import { ModalWindow } from 'components/modal'
import { ReportForm } from 'components/report-form'
import { CustomTable } from 'components/table'
import { useQuery, useUpdateOrCreate, useUserData } from 'hooks'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { RegReport, Report } from 'type'

import { StyledButton, Wrapper } from './report-table.styled'

const LIMIT = 5

const filterData = [
  {
    label: 'reportList.equipment',
    key: 'equipment',
  },
  {
    label: 'reportList.user',
    key: 'user',
  },
  {
    label: 'reportList.report_date',
    key: 'report_date',
  },
]

export const ReportTable: FC = () => {
  const { t } = useTranslation()
  const { data: user } = useUserData()
  const {
    page,
    setPage,
    isOpenModal,
    setIsOpenModal,
    maxPage,
    data: reports,
    isVisibilityKey,
    isFetching,
  } = useQuery<Report>(LIMIT, reportApi.useGetReportsQuery)
  const [deleteEq] = reportApi.useDeleteReportMutation()

  const props = useUpdateOrCreate<RegReport>(
    reportApi.useCreateReportMutation,
    reportApi.useChangeReportMutation
  )

  const [getRp, { data: report, reset }] = reportApi.useGetOneReportMutation()

  useEffect(() => {
    if (report) {
      setIsOpenModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report])

  useEffect(() => {
    if (!isOpenModal && report) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal])

  return (
    <Wrapper>
      {user?.is_superuser && (
        <StyledButton onClick={() => setIsOpenModal(true)} variant='contained'>
          {t('reportList.addReport')}
        </StyledButton>
      )}
      <Filters filterData={filterData} />
      {isFetching && <CircularProgress />}
      {!isFetching && !!reports?.length && (
        <CustomTable
          data={reports}
          isVisibilityKey={isVisibilityKey}
          translateBase='reportList'
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          deleteObj={deleteEq}
          setId={getRp}
        />
      )}
      <ModalWindow
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        {...props}
      >
        <ReportForm {...props} report={report} />
      </ModalWindow>
    </Wrapper>
  )
}
