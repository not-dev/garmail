declare type GrnEmailAddress = {
    username: string;
    email: string;
};
declare const validateGrn: (s: string) => false | string | GrnEmailAddress;
declare const getSubdomain: () => string;
export { validateGrn, getSubdomain };
//# sourceMappingURL=ext.d.ts.map