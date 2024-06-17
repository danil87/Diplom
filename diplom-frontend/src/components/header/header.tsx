import PropaneIcon from '@mui/icons-material/Propane'
import { AppBar, Button, IconButton } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import { authApi } from 'api'
import { SelectLanguage } from 'components/select-language'
import { useUserData } from 'hooks/user'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { StyledBox } from './header.styled'

const style = { color: '#fff' }

export const Header: FC = () => {
  const { t } = useTranslation()
  const { data: user, isSuccess } = useUserData()
  const navigate = useNavigate()
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
              <Button
                data-testid='username-button'
                variant='text'
                sx={style}
                onClick={() => navigate('cabinet')}
              >
                {user.username}
              </Button>
              <Button
                data-testid='sign-out-button'
                sx={style}
                onClick={() => signOut()}
              >
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
