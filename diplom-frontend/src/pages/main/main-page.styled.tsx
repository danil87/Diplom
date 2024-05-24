import { Box, Drawer, styled } from '@mui/material'

export const CustomDrawer = styled(Drawer)`
  & .MuiPaper-root {
    top: 64px;
  }
`

export const Content = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 64px;
  left: 250px;
  right: 0;
  bottom: 0;
`
