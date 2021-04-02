import { validateGrn } from '@api/garoon'
import type { ChipInputProps } from '@molecules'
import { ChipInput } from '@molecules'
import React from 'react'

const ChipInputGrnMail:React.FC<ChipInputProps> = (props) => {
  const validate = (chip: typeof props.chips[0]): boolean => !!validateGrn(chip)

  return (
    <ChipInput
      validate={validate}
      {...props}
    />
  )
}

export { ChipInputGrnMail }
