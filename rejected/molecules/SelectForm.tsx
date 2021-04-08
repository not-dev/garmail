
import type { SelectProps } from '@material-ui/core'
import { Box, FormControl, InputLabel, Select } from '@material-ui/core'
import { unusedVars } from '@util'
import React from 'react'

type SelectFormProps<T=string|number|undefined> = SelectProps & {
  value: T,
  setValue: (value: T) => void
  valueList: T[]|Array<{ value:T, name: string }|undefined>
}

const SelectForm = <T extends (string|number|undefined), >(props: SelectFormProps<T>): React.ReactElement => {
  const { value: _value, setValue: _setValue, valueList: _valueList, variant, ...selectProps } = props
  unusedVars([_value, _setValue, _valueList])
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setValue(event.target.value as T)
  }

  return (
    <React.Suspense fallback={<span>load</span>}>
      <Box minWidth={120}>
        <FormControl fullWidth variant={variant}>
          <InputLabel id='signature-label' shrink>signature</InputLabel>
          <Select
            native
            label='signature'
            labelId='signature-label'
            value={props.value}
            onChange={handleChange}
            { ...selectProps }
          >
            {
              props.valueList.map((v: T|{ value:T, name: string }|undefined, i: number) => {
                if ((typeof v === 'string') || (typeof v === 'number')) {
                  return (
                    <React.Fragment key={`${v}-${i}`}>
                      <option value={v}>{v}</option>
                    </React.Fragment>
                  )
                } else if (typeof v === 'undefined') {
                  return (
                    <React.Fragment key={`None-${i}`}>
                      <option value={undefined}> --- </option>
                    </React.Fragment>
                  )
                } else {
                  const obj = v as { value: T, name: string }
                  return (
                    <React.Fragment key={`${(obj.value) ? (obj.value as string|number) : 'None'}-${i}`}>
                      <option value={obj.value}>{obj.name}</option>
                    </React.Fragment>
                  )
                }
              })
            }
          </Select>
        </FormControl>
      </Box>
    </React.Suspense>
  )
}

export { SelectForm }
export type { SelectFormProps }
