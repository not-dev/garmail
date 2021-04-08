declare type HttpResponse = {
    statusCode: number;
    body: string | Record<string, unknown>;
};
declare const sendMail: (params: {
    to: string | string[];
    subject: string;
    body: string;
    cc?: string | string[];
}) => Promise<HttpResponse>;
export { sendMail };
//# sourceMappingURL=wrapper.d.ts.map