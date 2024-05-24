import { Box, Container, styled } from '@mui/material'

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  bottom: 0;
`

export const FromContainer = styled(Container)`
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 50px;
  border: 1px solid #e5e5e5e5;
  border-radius: 8px;
`
