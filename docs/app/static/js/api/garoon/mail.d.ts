import { postRequest } from '@api/garoon';
declare const getMailAccountId: () => Promise<string>;
declare const getSignature: (accountId: string) => Promise<Array<{
    name: string;
    content: string;
} | undefined>>;
declare const getEmail: (id: string) => Promise<string>;
declare const sendMail: ({ to, subject, body, cc }: {
    to: string | string[];
    subject: string;
    body: string;
    cc?: string | string[] | undefined;
}) => Promise<import("./request").GrnHttpResponse>;
export { sendMail, getMailAccountId, getEmail, getSignature };
//# sourceMappingURL=mail.d.ts.map