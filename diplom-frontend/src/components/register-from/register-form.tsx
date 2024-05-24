import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material'
import { authApi } from 'api'
import { userApi } from 'api/user-api'
import { StyledCheckBox } from 'components/check-box'
import { PasswordInput } from 'components/password-input'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { registerScheme } from 'utils/scheme'

import { inputsData } from './lib/inputs-data'
import { CustomAlert } from './register-form.styled'
import { RegisterData } from './type'

export const RegisterForm: FC = () => {
  const [errMes, setErrMes] = useState<string>('')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: user } = userApi.useGetUserQuery(undefined, {
    skip: !localStorage.getItem('access'),
  })
  const [reg, { isLoading, isSuccess, isError, error }] =
    authApi.useRegisterMutation()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    mode: 'all',
    defaultValues: {
      is_superuser: false,
    },
    resolver: yupResolver(registerScheme),
  })

  useEffect(() => {
    if (isSuccess && !user) {
      navigate('/sign-in', { state: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (error && 'data' in error) {
      setErrMes(Object.values(error.data as object)[0] as string)
    }
  }, [error])

  return (
    <>
      {isError && errMes && (
        <CustomAlert severity='error'>{errMes}</CustomAlert>
      )}
      <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('auth.signUp')}
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(reg)}
          noValidate
          sx={{ mt: 1 }}
        >
          {inputsData.map(({ name }) => {
            if (name === 'password') {
              return (
                <PasswordInput
                  {...register('password')}
                  key={name}
                  error={!!errors.password?.message}
                  helperText={
                    errors.password?.message && t(errors.password?.message)
                  }
                />
              )
            }
            if (name === 'is_superuser') {
              return (
                user?.is_superuser && (
                  <StyledCheckBox key={name} control={control} />
                )
              )
            }

            return (
              <TextField
                {...register(name)}
                key={name}
                error={!!errors[name]?.message}
                helperText={
                  errors[name]?.message && t(`${errors[name]?.message}`)
                }
                margin='normal'
                fullWidth
                label={t(`auth.${name}`)}
              />
            )
          })}
          <LoadingButton
            loading={isLoading}
            disabled={!isValid}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {t('auth.reg')}
          </LoadingButton>
          {!user?.is_superuser && (
            <Grid container>
              <Grid item>
                <Link to='/sign-in'>{t('auth.haveAccount')}</Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </>
    </>
  )
}
