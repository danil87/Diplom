import { Box, styled } from '@mui/material'

export const Header = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '10px 30px',
  borderBottom: '1px solid #e5e5e5e5',
  zIndex: 1,
  backgroundColor: '#fff',
})
