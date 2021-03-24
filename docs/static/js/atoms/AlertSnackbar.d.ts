import { SnackbarProps } from '@material-ui/core/Snackbar';
import { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
declare type AlertSnackbarProps = SnackbarProps & {
    severity?: AlertProps['severity'];
    message?: React.ReactNode;
    alertProps?: AlertProps;
};
declare const AlertSnackbar: React.FC<AlertSnackbarProps>;
export { AlertSnackbar };
export type { AlertSnackbarProps };
//# sourceMappingURL=AlertSnackbar.d.ts.map