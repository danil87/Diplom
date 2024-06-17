import { TextField } from '@mui/material'
import { useCombinedRef } from 'hooks'
import { ChangeEvent, forwardRef, useRef, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { RegMaintenance } from 'type'

type Props = {
  error?: boolean
  helperText?: string
  dataTestid: string
  label?: string
} & ReturnType<UseFormRegister<RegMaintenance>>

export const InputNumber = forwardRef<HTMLInputElement, Props>(
  (props, parentRef) => {
    const [value, setValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const combinedRef = useCombinedRef(inputRef, parentRef)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!inputRef.current || !event.target.value.match(/^-?\d*\.?\d*$/)) {
        return
      }

      setValue(event.target.value)

      inputRef.current.value = event.target.value
      props.onChange({ target: inputRef.current })
    }

    const { dataTestid, ...other } = props

    return (
      <>
        <TextField {...other} value={value} onChange={onChange} />
        <TextField
          {...other}
          sx={{ display: 'none' }}
          inputRef={combinedRef}
          data-testid={dataTestid}
        />
      </>
    )
  }
)
