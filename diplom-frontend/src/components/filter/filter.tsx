import { Box, Button, TextField } from '@mui/material'
import { FC, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

type FilterData = {
  label: string
  key: string
}

type Props = {
  filterData: FilterData[]
}

export const Filters: FC<Props> = ({ filterData }) => {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const [key, setKey] = useState<number>(0)
  const changeSearchParams = (key: string, value: string) => {
    params.set(key, value)
  }

  const reset = () => {
    for (const filter of filterData) {
      params.delete(filter.key)
    }

    setParams(params)

    setKey(prev => prev + 1)
  }

  const refetch = () => {
    setParams(params)
  }

  return (
    <Fragment key={key}>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        {filterData.map(({ key, label }) => (
          <TextField
            key={key}
            label={t(label)}
            defaultValue={params.get(key) || ''}
            onChange={e => changeSearchParams(key, e.target.value)}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          gap: '10px',
        }}
      >
        <Button onClick={reset}>Сбросить</Button>
        <Button variant='contained' onClick={refetch}>
          Принять
        </Button>
      </Box>
    </Fragment>
  )
}
