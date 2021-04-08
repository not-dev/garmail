declare type SOAPParams = {
    action: string;
    parameters: string;
};
declare type HttpResponse = {
    statusCode: number;
    body: string | Record<string, unknown>;
};
declare type GrnHttpResponse = Omit<HttpResponse, 'body'> & {
    body: {
        returns?: Element;
    };
};
declare const postRequest: (url: string, soapParams: SOAPParams) => Promise<GrnHttpResponse>;
export { postRequest, GrnHttpResponse, HttpResponse };
//# sourceMappingURL=request.d.ts.map