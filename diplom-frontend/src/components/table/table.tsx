import DeleteIcon from '@mui/icons-material/Delete'
import {
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { StyledTableRow } from './table.styled'

type Props<T> = {
  isVisibilityKey: (key: string) => boolean
  data: T[]
  translateBase: string
  page: number
  setPage: (page: number) => void
  maxPage: number
  deleteObj?: (id: number) => void
  setId?: (id: number) => void
}

export const CustomTable = <T extends { id?: number } & object>({
  isVisibilityKey,
  data,
  translateBase,
  page,
  setPage,
  maxPage,
  deleteObj,
  setId,
}: Props<T>) => {
  const { t } = useTranslation()
  const dataKeys = useMemo(() => Object.keys(data[0]), [data])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {dataKeys.map(
                key =>
                  isVisibilityKey(key) && (
                    <TableCell key={key}>
                      {t(`${translateBase}.${key}`)}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(el => (
              <StyledTableRow
                key={el.id}
                onClick={() => setId?.(el.id!)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {dataKeys.map(
                  key =>
                    isVisibilityKey(key) && (
                      <TableCell key={key + key}>
                        {String(el[key as keyof T])}
                      </TableCell>
                    )
                )}
                {deleteObj && (
                  <TableCell>
                    <IconButton
                      onClick={() => deleteObj(el.id!)}
                      aria-label='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        color='primary'
        page={page}
        onChange={(_, page) => setPage(page)}
        count={maxPage}
      />
    </>
  )
}
