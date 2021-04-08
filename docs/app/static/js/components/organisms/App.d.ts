import type { Entry, MainProps } from '@components/organisms';
import React from 'react';
declare type AppProps = {
    title: string | React.ReactElement;
    url: string;
    dbPrefix: string;
    text: {
        tooltip: {
            help: string;
        };
        main: MainProps['text'];
    };
    examples?: Record<Entry[0], Entry[1]>;
};
declare const App: React.FC<AppProps>;
export { App };
//# sourceMappingURL=App.d.ts.map