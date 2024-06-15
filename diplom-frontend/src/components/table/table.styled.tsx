import { styled, TableRow } from '@mui/material'

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: none;
  }
`
