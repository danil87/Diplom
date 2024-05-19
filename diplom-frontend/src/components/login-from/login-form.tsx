import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material'
import { authApi } from 'api'
import { PasswordInput } from 'components/password-input'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginScheme } from 'utils/scheme'

import { CustomAlert, Wrapper } from './login-form.styled'
import { LoginData } from './type'

export const LoginForm: FC = () => {
  const { state } = useLocation()
  const [errMes, setErrMes] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    mode: 'all',
    resolver: yupResolver(loginScheme),
  })
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [signIn, { isLoading, isSuccess, isError, error }] =
    authApi.useSignInMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
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
      {(isError || state) && (
        <CustomAlert severity={isError ? 'error' : 'success'}>
          {error ? errMes : state && t('auth.registerSuccess')}
        </CustomAlert>
      )}
      <Wrapper>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('auth.signIn')}
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(signIn)}
          noValidate
          sx={{ mt: 1 }}
        >
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

          <LoadingButton
            loading={isLoading}
            disabled={!isValid}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {t('auth.signIn')}
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to='/sign-up'>{t('auth.dontHaveAccount')}</Link>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
    </>
  )
}
