import { Checkbox, FormControlLabel } from '@mui/material'
import { RegisterData } from 'components/register-from'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<RegisterData, any>
}

export const StyledCheckBox: FC<Props> = ({ control }) => {
  const { t } = useTranslation()

  return (
    <Controller
      control={control}
      name='is_superuser'
      render={({ field }) => (
        <FormControlLabel
          label={t('auth.is_superuser')}
          control={
            <Checkbox
              inputRef={field.ref}
              checked={field.value}
              onChange={field.onChange}
            />
          }
        />
      )}
    />
  )
}
