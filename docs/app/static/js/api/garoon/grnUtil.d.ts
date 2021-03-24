declare const getRequestToken: () => Promise<string | undefined>;
declare const getSubdomain: () => string;
declare type GaroonUser = {
    name: string;
    email: string;
};
declare const getLoginUser: () => Promise<GaroonUser>;
export { getRequestToken, getSubdomain, getLoginUser };
//# sourceMappingURL=grnUtil.d.ts.map