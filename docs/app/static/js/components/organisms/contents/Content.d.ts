import type { Entry } from '@components/organisms';
import React from 'react';
declare type ContentProps = {
    entries: Entry[];
    setEntries: (entries: Entry[]) => void;
    onAdd?: (record: Record<Entry[0], Entry[1]>) => void;
    onRemove?: (key: Entry[0]) => void;
};
declare const Content: React.FC<ContentProps>;
export { Content };
export type { ContentProps };
//# sourceMappingURL=Content.d.ts.map