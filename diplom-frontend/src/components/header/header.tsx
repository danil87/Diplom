import PropaneIcon from '@mui/icons-material/Propane'
import { AppBar, Button, IconButton } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import { authApi } from 'api'
import { SelectLanguage } from 'components/select-language'
import { useUserData } from 'hooks/user'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { StyledBox } from './header.styled'

const style = { color: '#fff' }

export const Header: FC = () => {
  const { t } = useTranslation()
  const { data: user, isSuccess } = useUserData()
  const [signOut, { isSuccess: isSuccessSignOut }] =
    authApi.useSignOutMutation()

  useEffect(() => {
    if (isSuccessSignOut) {
      localStorage.removeItem('access')
      window.location.reload()
    }
  }, [isSuccessSignOut])

  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton sx={style}>
          <PropaneIcon />
        </IconButton>
        <StyledBox>
          {isSuccess && (
            <>
              <Button variant='text' sx={style}>
                {user.username}
              </Button>
              <Button sx={style} onClick={() => signOut()}>
                {t('auth.signOut')}
              </Button>
            </>
          )}
          <SelectLanguage />
        </StyledBox>
      </Toolbar>
    </AppBar>
  )
}
