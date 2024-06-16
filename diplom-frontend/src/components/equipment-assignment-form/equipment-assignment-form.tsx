import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import { equipmentApi, userApi } from 'api'
import { CustomSelect } from 'components/custom-select'
import { DateInput } from 'components/date-input'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RegEquipmentAssignment } from 'type'
import { equipmentAssignmentSchema } from 'utils/scheme'

import { Wrapper } from './equipment-assignment-form.styled'
import { inputsData } from './lib/input-data'

type Props = {
  createFn: (eq: RegEquipmentAssignment) => void
  updateFn: (eq: RegEquipmentAssignment) => void
  equipmentAssignment?: RegEquipmentAssignment
}

export const EquipmentAssignmentForm: FC<Props> = ({
  createFn,
  updateFn,
  equipmentAssignment,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegEquipmentAssignment>({
    mode: 'all',
    defaultValues: equipmentAssignment || {},
    resolver: yupResolver(equipmentAssignmentSchema),
  })

  const onSubmit = (data: RegEquipmentAssignment) => {
    if (equipmentAssignment) {
      updateFn(data)
    } else {
      createFn(data)
    }
  }

  const label = equipmentAssignment
    ? t('equipmentAssignmentList.updateEquipment')
    : t('equipmentAssignmentList.addEquipmentAssignment')

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
            label: t(`equipmentAssignmentList.${name}`),
          }

          if (type === 'date') {
            return (
              <DateInput
                {...register(name)}
                key={name}
                dataTestid={`date-input-equipment-${name}`}
                control={control}
                defaultValue={`${getValues(name)}`}
                {...props}
              />
            )
          }

          if (name === 'equipment') {
            return (
              <CustomSelect
                {...register(name)}
                key={name}
                dataTestid={`select-input-${name}`}
                defaultValue={getValues(name) as number}
                useGetQuery={equipmentApi.useGetEquipmentsQuery}
                keyForShow='serial_number'
                {...props}
              />
            )
          }

          if (name === 'user') {
            return (
              <CustomSelect
                {...register(name)}
                key={name}
                dataTestid={`select-input-${name}`}
                defaultValue={getValues(name) as number}
                useGetQuery={userApi.useGetUsersQuery}
                keyForShow='username'
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
