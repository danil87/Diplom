import { styled, TextField } from '@mui/material'

export const CustomTextField = styled(TextField)({
  '& .MuiInput-root, & .MuiFormHelperText-root': {
    color: '#fff',
  },
  '& .MuiInput-root::before': {
    borderBottom: 'none',
  },
})
