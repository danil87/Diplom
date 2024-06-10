import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BadgeIcon from '@mui/icons-material/Badge'
import ConstructionIcon from '@mui/icons-material/Construction'
import EngineeringIcon from '@mui/icons-material/Engineering'
import ReportIcon from '@mui/icons-material/Report'
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
  {
    name: 'equipment',
    path: 'equipment',
    icon: <ConstructionIcon />,
  },
  {
    name: 'assignmentEquipment',
    path: 'assignmentEquipment',
    icon: <AssignmentIndIcon />,
  },
  {
    name: 'maintenance',
    path: 'maintenance',
    icon: <EngineeringIcon />,
  },
  {
    name: 'report',
    path: 'report',
    icon: <ReportIcon />,
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
