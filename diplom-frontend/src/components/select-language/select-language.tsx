import { MenuItem, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CustomTextField } from './select-language.styled'

export const SelectLanguage: FC = () => {
  const { i18n } = useTranslation()
  const [languages] = useState<readonly string[]>(i18n.languages)

  return (
    <CustomTextField
      select
      value={i18n.language}
      // helperText={t('lang.lang')}
      variant='standard'
      onChange={e => i18n.changeLanguage(e.target.value)}
    >
      {languages.map(language => (
        <MenuItem key={language} value={language}>
          <Typography>{language}</Typography>
        </MenuItem>
      ))}
    </CustomTextField>
  )
}
