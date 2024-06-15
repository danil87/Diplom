import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { manufacturerApi } from 'api'
import { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { RegEquipment } from 'type'

import { SelectMenu } from './select-manufacturer.styled'

type Props = {
  error?: boolean
  helperText?: string
  label?: string
  dataTestid: string
  defaultValue?: number
} & ReturnType<UseFormRegister<RegEquipment>>

export const SelectManufacturer = forwardRef<HTMLInputElement, Props>(
  (
    { error, helperText, defaultValue, dataTestid, label, ...other },
    parentRef
  ) => {
    const { data: manufacturers, isLoading } =
      manufacturerApi.useGetManufacturersQuery('')

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
          {manufacturers?.results.map(manufacturer => (
            <MenuItem key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
)
