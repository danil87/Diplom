import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { TypedUseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseQuery } from 'api/config'
import { ForwardedRef, forwardRef } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { QueryResponse } from 'type'

import { SelectMenu } from './custom-select.styled'

type Props<T extends FieldValues, K extends { id?: number }> = {
  error?: boolean
  helperText?: string
  label?: string
  dataTestid: string
  defaultValue?: number
  useGetQuery: TypedUseQuery<
    QueryResponse<K>,
    string,
    ReturnType<typeof getBaseQuery>
  >
  keyForShow: keyof K
} & ReturnType<UseFormRegister<T>>

const StyledSelect = <T extends FieldValues, K extends { id?: number }>(
  {
    error,
    helperText,
    defaultValue,
    dataTestid,
    useGetQuery,
    keyForShow,
    label,
    ...other
  }: Props<T, K>,
  parentRef: ForwardedRef<HTMLInputElement>
) => {
  const { data, isLoading } = useGetQuery('')

  return (
    <FormControl
      data-testid={dataTestid}
      error={error}
      variant='outlined'
      fullWidth
    >
      <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
      <Select
        label={label}
        defaultValue={defaultValue || ''}
        inputProps={{ ...other, inputRef: parentRef }}
      >
        {isLoading && (
          <SelectMenu>
            <CircularProgress />
          </SelectMenu>
        )}
        {data?.results.map(el => (
          <MenuItem key={el.id!} value={el.id!}>
            {`${el[keyForShow]}`}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export const CustomSelect = forwardRef(StyledSelect) as <
  T extends FieldValues,
  K extends { id?: number },
>(
  props: Props<T, K>,
  parentRef: ForwardedRef<HTMLInputElement>
) => ReturnType<typeof StyledSelect>
