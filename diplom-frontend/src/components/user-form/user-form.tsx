import { LoadingButton } from '@mui/lab'
import { TextField } from '@mui/material'
import { userApi } from 'api'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { User } from 'type'

import { Wrapper } from './user-form.styled'
import { inputsData } from './дши/input-data'

type Props = {
  user: User
}

export const UserForm: FC<Props> = ({ user }) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({ mode: 'all', defaultValues: user })

  const [updateUser] = userApi.useUpdateUserMutation()

  return (
    <Wrapper component='form' onSubmit={handleSubmit(updateUser)}>
      {inputsData.map(({ name }) => (
        <TextField
          {...register(name)}
          label={t(`cabinet.${name}`)}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message && t(`${errors[name]?.message}`)}
          disabled={name === 'role' && !user.is_superuser}
        />
      ))}
      <LoadingButton variant='contained' disabled={!isValid} type='submit'>
        Сохранить
      </LoadingButton>
    </Wrapper>
  )
}
