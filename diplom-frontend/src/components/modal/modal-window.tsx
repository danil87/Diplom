import CloseIcon from '@mui/icons-material/Close'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { FC, ReactNode, useEffect } from 'react'

import {
  CustomIconButton,
  StyledAlert,
  StyledModal,
  Wrapper,
} from './model-window.styled'

type Props = {
  open: boolean
  onClose: () => void
  isSuccess: boolean
  isError: boolean
  error: FetchBaseQueryError | SerializedError | undefined
  children: ReactNode
}

export const ModalWindow: FC<Props> = ({
  children,
  onClose,
  open,
  isSuccess,
  isError,
  error,
}) => {
  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <StyledModal open={open} onClose={onClose}>
      <Wrapper>
        {isError && (
          <StyledAlert severity='error'>{JSON.stringify(error)}</StyledAlert>
        )}
        <CustomIconButton onClick={() => onClose()}>
          <CloseIcon />
        </CustomIconButton>
        {children}
      </Wrapper>
    </StyledModal>
  )
}
