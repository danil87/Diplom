import BadgeIcon from '@mui/icons-material/Badge'
import { DrawerList } from 'components/drawer-list'
import { Header } from 'components/header'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Content, CustomDrawer } from './main-page.styled'

const drawerListItem = [
  {
    name: 'employees',
    path: 'employees',
    icon: <BadgeIcon />,
  },
]

export const MainPage: FC = () => (
  <>
    <Header />
    <CustomDrawer variant='permanent' open={true} sx={{ top: '64px' }}>
      <DrawerList drawerListItems={drawerListItem} />
    </CustomDrawer>
    <Content>
      <Outlet />
    </Content>
  </>
)
