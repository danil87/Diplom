import {
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

type Props<T> = {
  isVisibilityKey: (key: string) => boolean
  data: T[]
  translateBase: string
}

export const CustomTable = <T extends { id: number } & object>({
  isVisibilityKey,
  data,
  translateBase,
}: Props<T>) => {
  const { t } = useTranslation()
  const dataKeys = useMemo(() => Object.keys(data[0]), [data])

  return (
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
            <TableRow
              key={el.id}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
