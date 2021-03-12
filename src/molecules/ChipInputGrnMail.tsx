import { validateGrn } from '@api/garoon'
import type { ChipInputProps } from '@molecules'
import { ChipInput } from '@molecules'
import React from 'react'

const ChipInputGrnMail:React.FC<ChipInputProps> = (props) => {
  return (
    <ChipInput
      sep=','
      validate={(chip) => !!validateGrn(chip)}
      {...props}
    />
  )
}

export { ChipInputGrnMail }
