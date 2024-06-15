import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import { DateInput } from 'components/date-input'
import { SelectManufacturer } from 'components/select-manufacturer'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RegEquipment } from 'type'
import { equipmentScheme } from 'utils/scheme'

import { Wrapper } from './equipment-form.styled'
import { inputsData } from './lib/input-data'

type Props = {
  createFn: (eq: RegEquipment) => void
  updateFn: (eq: RegEquipment) => void
  equipment?: RegEquipment
}

export const EquipmentForm: FC<Props> = ({ createFn, updateFn, equipment }) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegEquipment>({
    mode: 'all',
    defaultValues: equipment || {},
    resolver: yupResolver(equipmentScheme),
  })

  const onSubmit = (data: RegEquipment) => {
    if (equipment) {
      updateFn(data)
    } else {
      createFn(data)
    }
  }

  const label = equipment
    ? t('equipmentList.updateEquipment')
    : t('equipmentList.addEquipment')

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
            label: t(`equipmentList.${name}`),
          }

          if (type === 'date') {
            return (
              <DateInput
                {...register(name)}
                key={name}
                dataTestid={`date-input-equipment-${name}`}
                control={control}
                defaultValue={getValues(name) as string}
                {...props}
              />
            )
          }

          if (name === 'manufacturer') {
            return (
              <SelectManufacturer
                {...register(name)}
                key={name}
                dataTestid='select-input-manufacturer'
                defaultValue={getValues(name) as number}
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
