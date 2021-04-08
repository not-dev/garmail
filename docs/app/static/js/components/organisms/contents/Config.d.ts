import React from 'react';
declare type ConfigItem = Partial<{
    to: string[];
    cc: string[];
    subject: string;
    body: string;
}>;
declare type ConfigProps = {
    config: ConfigItem;
    setConfig: (config: ConfigProps['config']) => void;
    handleDelete: () => void;
    text: {
        label: {
            to: string;
            cc: string;
            subject: string;
            body: string;
        };
        deleteConfirm: {
            title: string;
            message: string;
        };
        button: {
            delete: string;
        };
    };
};
declare const Config: React.FC<ConfigProps>;
export { Config };
export type { ConfigProps, ConfigItem };
//# sourceMappingURL=Config.d.ts.map