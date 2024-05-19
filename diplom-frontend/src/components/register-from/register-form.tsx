import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material'
import { authApi } from 'api'
import { PasswordInput } from 'components/password-input'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { registerScheme } from 'utils/scheme'

import { CustomAlert, Wrapper } from './register-form.styled'
import { RegisterData } from './type'

export const RegisterForm: FC = () => {
  const [errMes, setErrMes] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    mode: 'all',
    defaultValues: {
      isSuperUser: false,
    },
    resolver: yupResolver(registerScheme),
  })
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [reg, { isLoading, isSuccess, isError, error }] =
    authApi.useRegisterMutation()

  useEffect(() => {
    if (isSuccess) {
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
      <Wrapper>
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
          <TextField
            {...register('firstName')}
            error={!!errors.firstName?.message}
            helperText={
              errors.firstName?.message && t(errors.firstName?.message)
            }
            margin='normal'
            fullWidth
            label={t('auth.firstName')}
          />
          <TextField
            {...register('lastName')}
            error={!!errors.lastName?.message}
            helperText={errors.lastName?.message && t(errors.lastName?.message)}
            margin='normal'
            fullWidth
            label={t('auth.lastName')}
          />
          <TextField
            {...register('email')}
            error={!!errors.email?.message}
            helperText={errors.email?.message && t(errors.email?.message)}
            margin='normal'
            fullWidth
            label={t('auth.email')}
          />
          <TextField
            {...register('username')}
            error={!!errors.username?.message}
            helperText={errors.username?.message && t(errors.username?.message)}
            margin='normal'
            fullWidth
            label={t('auth.username')}
          />
          <PasswordInput
            {...register('password')}
            error={!!errors.password?.message}
            helperText={errors.password?.message && t(errors.password?.message)}
          />
          <TextField
            {...register('role')}
            error={!!errors.role?.message}
            helperText={errors.role?.message && t(errors.role?.message)}
            margin='normal'
            fullWidth
            label={t('auth.role')}
          />
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
          <Grid container>
            <Grid item>
              <Link to='/sign-in'>{t('auth.haveAccount')}</Link>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
    </>
  )
}
