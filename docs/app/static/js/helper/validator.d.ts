declare type GrnEmailAddress = {
    username: string;
    email: string;
};
declare const validateGrn: (s: string) => false | string | GrnEmailAddress;
export { validateGrn };
//# sourceMappingURL=validator.d.ts.map