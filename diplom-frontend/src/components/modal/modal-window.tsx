import CloseIcon from '@mui/icons-material/Close'
import { FC, ReactNode } from 'react'

import { CustomIconButton, StyledModal, Wrapper } from './model-window.styled'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export const ModalWindow: FC<Props> = ({ children, ...props }) => (
  <StyledModal {...props}>
    <Wrapper>
      <CustomIconButton onClick={() => props.onClose()}>
        <CloseIcon />
      </CustomIconButton>
      {children}
    </Wrapper>
  </StyledModal>
)
