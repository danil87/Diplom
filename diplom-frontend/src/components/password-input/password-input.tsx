import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { LoginData } from 'components/login-from'
import { forwardRef, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  error?: boolean
  helperText?: string
  dataTestid: string
} & ReturnType<UseFormRegister<LoginData>>

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ error, helperText, dataTestid, ...register }, parentRef) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { t } = useTranslation()

    return (
      <FormControl error={error} margin='normal' variant='outlined' fullWidth>
        <InputLabel htmlFor='outlined-adornment-password'>
          {t('auth.password')}
        </InputLabel>
        <OutlinedInput
          inputRef={parentRef}
          type={showPassword ? 'text' : 'password'}
          inputProps={{
            'data-testid': dataTestid,
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(show => !show)}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={t('auth.password')}
          {...register}
        />
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
)
