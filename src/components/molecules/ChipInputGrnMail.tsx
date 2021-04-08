import type { ChipInputProps } from '@components/molecules'
import { ChipInput } from '@components/molecules'
import { validateGrn } from '@helper'
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
