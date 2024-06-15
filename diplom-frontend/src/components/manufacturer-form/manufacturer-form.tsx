import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Manufacturer } from 'type'
import { manufacturerSchema } from 'utils/scheme'

import { inputsData } from './lib/input-data'
import { Wrapper } from './manufacturer-form.styled'

type Props = {
  createFn: (body: Manufacturer) => void
  updateFn: (body: Manufacturer) => void
  manufacturer?: Manufacturer
}

export const ManufacturerForm: FC<Props> = ({
  createFn,
  updateFn,
  manufacturer,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Manufacturer>({
    mode: 'all',
    defaultValues: manufacturer || {},
    resolver: yupResolver(manufacturerSchema),
  })

  const onSubmit = (data: Manufacturer) => {
    if (manufacturer) {
      updateFn(data)
    } else {
      createFn(data)
    }
  }

  const label = manufacturer
    ? t('manufacturerList.updateManufacturer')
    : t('manufacturerList.addManufacturer')

  return (
    <>
      <Typography component='h1' variant='h5' style={{ marginBottom: '20px' }}>
        {label}
      </Typography>
      <Wrapper component='form' onSubmit={handleSubmit(onSubmit)}>
        {inputsData.map(({ name }) => (
          <TextField
            {...register(name)}
            key={name}
            label={t(`manufacturerList.${name}`)}
            error={!!errors[name]?.message}
            helperText={errors[name]?.message && t(`${errors[name]?.message}`)}
          />
        ))}
        <LoadingButton disabled={!isValid} type='submit' variant='contained'>
          {label}
        </LoadingButton>
      </Wrapper>
    </>
  )
}
