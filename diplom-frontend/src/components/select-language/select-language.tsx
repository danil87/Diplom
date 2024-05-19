import { MenuItem, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const SelectLanguage: FC = () => {
  const { t, i18n } = useTranslation()
  const [languages] = useState<readonly string[]>(i18n.languages)

  return (
    <TextField
      select
      value={i18n.language}
      helperText={t('lang.lang')}
      variant='standard'
      onChange={e => i18n.changeLanguage(e.target.value)}
    >
      {languages.map(language => (
        <MenuItem key={language} value={language}>
          {language}
        </MenuItem>
      ))}
    </TextField>
  )
}
