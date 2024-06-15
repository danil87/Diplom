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
  padding: 50px 20px;
`
