
import { Box, FormControl, InputLabel, Select } from '@material-ui/core'
import React from 'react'

type SignatureId = number | undefined
type Signature = { id: SignatureId, name: string, value: string }

type SelectSignatureProps = {
  id: SignatureId,
  setId: (id: SignatureId) => void
  signatures: Signature[]
}

const SelectSignature: React.FC<SelectSignatureProps> = (props) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setId(event.target.value as Signature['id'])
  }

  return (
    <React.Suspense fallback={<span>load</span>}>
      <Box minWidth={120}>
        <FormControl fullWidth>
          <InputLabel id='signature-label' shrink>signature</InputLabel>
          <Select
            native
            label='signature'
            labelId='signature-label'
            value={props.id}
            onChange={handleChange}
          >
            <option value={undefined}>None</option>
            {
              props.signatures.map((i) => {
                return (
                  <option value={i.id}>{i.name}</option>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>
    </React.Suspense>
  )
}

export { SelectSignature }
export type { Signature, SelectSignatureProps }
