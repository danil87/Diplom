import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useCombinedRef } from 'hooks'
import { forwardRef, useRef } from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { RegEquipment } from 'type'

type Props = {
  error?: boolean
  helperText?: string
  dataTestid: string
  label?: string
  defaultValue?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<RegEquipment, any>
} & ReturnType<UseFormRegister<RegEquipment>>

export const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ dataTestid, control, defaultValue, ...other }, parentRef) => {
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
)
