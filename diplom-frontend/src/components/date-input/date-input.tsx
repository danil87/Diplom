import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useCombinedRef } from 'hooks'
import { ForwardedRef, forwardRef, useRef } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  error?: boolean
  helperText?: string
  dataTestid: string
  label?: string
  defaultValue?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<T, any>
} & ReturnType<UseFormRegister<T>>

const CustomDateInput = <T extends FieldValues>(
  { dataTestid, control, defaultValue, ...other }: Props<T>,
  parentRef: ForwardedRef<HTMLInputElement>
) => {
  const datePickerRef = useRef<HTMLInputElement>(null)
  const combinedRef = useCombinedRef(datePickerRef, parentRef)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={other.name}
        control={control}
        render={({ field }) => (
          <DatePicker
            onChange={newValue => {
              field.onChange(newValue)
            }}
            data-testid={dataTestid}
            slotProps={{
              textField: {
                ...other,
                inputRef: combinedRef,
                sx: { width: '100%' },
              },
            }}
            defaultValue={defaultValue ? dayjs(defaultValue) : null}
            format='YYYY-MM-DD'
          />
        )}
      />
    </LocalizationProvider>
  )
}

export const DateInput = forwardRef(CustomDateInput) as <T extends FieldValues>(
  props: Props<T>,
  parentRef: ForwardedRef<HTMLInputElement>
) => ReturnType<typeof CustomDateInput>
