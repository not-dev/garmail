import type { ConfigItem } from '@organisms';
import React from 'react';
declare type MailerProps = {
    config: Omit<ConfigItem, 'name'>;
    open: boolean;
    onClose: () => void;
    text: {
        title: string;
        snack: {
            pending: string;
            done: string;
            error: string;
            timeout: string;
        };
        button: {
            send: string;
            cancel: string;
        };
        label: {
            to: string;
            cc: string;
            subject: string;
            body: string;
        };
        helper: {
            invalidEmail: string;
            required: string;
        };
    };
};
declare const Mailer: React.FC<MailerProps>;
export { Mailer };
export type { MailerProps };
//# sourceMappingURL=Mailer.d.ts.map