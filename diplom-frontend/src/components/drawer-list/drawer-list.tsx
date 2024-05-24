import { Box } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type DrawerListItem = {
  name: string
  path: string
  icon: JSX.Element
}

type Props = {
  drawerListItems: DrawerListItem[]
}

export const DrawerList: FC<Props> = ({ drawerListItems }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ width: 250 }} role='presentation'>
      <List>
        {drawerListItems.map(({ name, path, icon }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={t(`drawerList.${name}`)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
