import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import { equipmentApi, userApi } from 'api'
import { CustomSelect } from 'components/custom-select'
import { DateInput } from 'components/date-input'
import { InputNumber } from 'components/input-number'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RegMaintenance } from 'type'
import { maintenanceSchema } from 'utils/scheme'

import { inputsData } from './lib/input-data'
import { Wrapper } from './maintenance-form.styled'

type Props = {
  createFn: (eq: RegMaintenance) => void
  updateFn: (eq: RegMaintenance) => void
  maintenance?: RegMaintenance
}

export const MaintenanceForm: FC<Props> = ({
  createFn,
  updateFn,
  maintenance,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegMaintenance>({
    mode: 'all',
    defaultValues: maintenance || {},
    resolver: yupResolver(maintenanceSchema),
  })

  const onSubmit = (data: RegMaintenance) => {
    if (maintenance) {
      updateFn(data)
    } else {
      createFn(data)
    }
  }

  const label = maintenance
    ? t('maintenanceList.updateMaintenance')
    : t('maintenanceList.addMaintenance')

  return (
    <>
      <Typography component='h1' variant='h5' style={{ marginBottom: '20px' }}>
        {label}
      </Typography>
      <Wrapper component='form' onSubmit={handleSubmit(onSubmit)}>
        {inputsData.map(({ name, type }) => {
          const props = {
            ...register(name),
            error: !!errors[name]?.message,
            helperText: errors[name]?.message && t(`${errors[name]?.message}`),
            label: t(`maintenanceList.${name}`),
          }

          if (type === 'date') {
            return (
              <DateInput
                {...props}
                key={name}
                dataTestid={`date-input-maintenance-${name}`}
                control={control}
                defaultValue={getValues(name) as string}
              />
            )
          }

          if (name === 'equipment') {
            return (
              <CustomSelect
                {...props}
                key={name}
                dataTestid={`select-input-${name}`}
                defaultValue={getValues(name) as number}
                useGetQuery={equipmentApi.useGetEquipmentsQuery}
                keyForShow='serial_number'
              />
            )
          }

          if (name === 'technician') {
            return (
              <CustomSelect
                {...props}
                key={name}
                dataTestid={`select-input-${name}`}
                defaultValue={getValues(name) as number}
                useGetQuery={userApi.useGetUsersQuery}
                keyForShow='username'
              />
            )
          }

          if (type === 'number') {
            return (
              <InputNumber
                {...props}
                key={name}
                dataTestid={`input-number-${name}`}
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
