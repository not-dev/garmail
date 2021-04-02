import { ChipProps, TextFieldProps } from '@material-ui/core';
import React from 'react';
declare type ChipInputPureProps = {
    seps?: string[];
    chips: string[];
    setChips: (chips: string[]) => void;
    validate?: (chip: string) => boolean;
};
declare type muiTextFieldProps = Omit<TextFieldProps, keyof ChipInputPureProps>;
declare type ChipInputProps = ChipInputPureProps & muiTextFieldProps & {
    muiChipProps?: ChipProps;
};
declare const ChipInput: React.FC<ChipInputProps>;
export { ChipInput };
export type { ChipInputProps };
//# sourceMappingURL=ChipInput.d.ts.map