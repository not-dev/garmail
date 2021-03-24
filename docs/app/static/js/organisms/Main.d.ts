import type { Entry, HinagataProps, MailerProps } from '@organisms';
import React from 'react';
declare type MainProps = {
    initEntries: Entry[];
    onAdd?: (record: Record<Entry[0], Entry[1]>) => void;
    onRemove?: (key: Entry[0]) => void;
    text: {
        newEntry: {
            title: string;
        };
        hinagata: HinagataProps['text'];
        mailer: MailerProps['text'];
    };
};
declare const Main: React.FC<MainProps>;
export { Main };
export type { MainProps };
//# sourceMappingURL=Main.d.ts.map