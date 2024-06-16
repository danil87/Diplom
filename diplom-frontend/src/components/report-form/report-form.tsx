import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import { equipmentApi, userApi } from 'api'
import { CustomSelect } from 'components/custom-select'
import dayjs from 'dayjs'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RegReport } from 'type'
import { reportSchema } from 'utils/scheme'

import { inputsData } from './lib/input-data'
import { Wrapper } from './report-form.styled'

type Props = {
  createFn: (eq: RegReport) => void
  updateFn: (eq: RegReport) => void
  report?: RegReport
}

export const ReportForm: FC<Props> = ({ createFn, updateFn, report }) => {
  const { t } = useTranslation()
  const { data: user } = userApi.useGetUserQuery()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegReport>({
    mode: 'all',
    defaultValues: report || {
      user: user?.id,
      report_date: dayjs().toDate(),
    },
    resolver: yupResolver(reportSchema),
  })

  const onSubmit = (data: RegReport) => {
    if (report) {
      updateFn(data)
    } else {
      createFn(data)
    }
  }

  const label = report
    ? t('reportList.updateReport')
    : t('reportList.addReport')

  useEffect(() => {
    if (user) {
      setValue('user', user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Typography component='h1' variant='h5' style={{ marginBottom: '20px' }}>
        {label}
      </Typography>
      <Wrapper component='form' onSubmit={handleSubmit(onSubmit)}>
        {inputsData.map(({ name, type }) => {
          const props = {
            error: !!errors[name]?.message,
            helperText: errors[name]?.message && t(`${errors[name]?.message}`),
            label: t(`reportList.${name}`),
          }

          if (type === 'textarea') {
            return (
              <TextField
                {...register(name)}
                {...props}
                data-testid='text-area-report'
                key={name}
                multiline
                maxRows={10}
              />
            )
          }

          if (name === 'equipment') {
            return (
              <CustomSelect
                {...register(name)}
                key={name}
                dataTestid='select-input-equipment'
                defaultValue={getValues(name) as number}
                useGetQuery={equipmentApi.useGetEquipmentsQuery}
                keyForShow='serial_number'
                {...props}
              />
            )
          }

          return <TextField {...register(name)} key={name} {...props} />
        })}

        <LoadingButton disabled={!isValid} variant='contained' type='submit'>
          {label}
        </LoadingButton>
      </Wrapper>
    </>
  )
}
