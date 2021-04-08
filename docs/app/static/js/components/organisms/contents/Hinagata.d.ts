import type { ConfigItem, ConfigProps } from '@components/organisms';
import React from 'react';
/**
 * [key, config, index]
 */
declare type Entry = [string, {
    index: number;
    title: string;
    config: ConfigItem;
}];
declare type HinagataProps = {
    entry: Entry;
    setEntry: (entry: Entry) => void;
    onClick: (entry: Entry) => void;
    handleDelete: (key: Entry[0]) => void;
    nth: number;
    text: {
        config: ConfigProps['text'];
    };
    initExpanded?: boolean;
};
declare const Hinagata: React.FC<HinagataProps>;
export { Hinagata };
export type { HinagataProps, Entry };
//# sourceMappingURL=Hinagata.d.ts.map