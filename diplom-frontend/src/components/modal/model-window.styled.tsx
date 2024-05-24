import { Box, IconButton, Modal, styled } from '@mui/material'

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled(Box)`
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  max-width: 46rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CustomIconButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`
