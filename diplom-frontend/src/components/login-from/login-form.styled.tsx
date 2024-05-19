import { Alert, Box } from '@mui/material'
import { styled } from '@mui/system'

export const Wrapper = styled(Box)`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 50px;
  border: 1px solid #e5e5e5e5;
  border-radius: 8px;
`

export const CustomAlert = styled(Alert)`
  position: fixed;
  top: 90px;
  left: 35%;
  right: 35%;
  z-index: 2;
`
