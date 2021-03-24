import React from 'react';
declare type ContextMenuProps = {
    open: boolean;
    onClose: () => void;
    anchorEl?: HTMLElement | null;
    anchorPosition?: {
        top: number;
        left: number;
    };
    handleDelete: () => void;
};
declare const ContextMenu: React.FC<ContextMenuProps>;
export { ContextMenu };
//# sourceMappingURL=ContextMenu.d.ts.map