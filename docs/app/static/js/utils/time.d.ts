/**
 * Sleep function
 * @param sec - number
 * @exsample const func = async () => {
 *  await sleep(1)
 * }
 */
declare const sleep: (sec: number) => Promise<void>;
declare type GetDateStringOpts = {
    digits?: {
        year?: number;
        month?: number;
        day?: number;
    };
    sep?: string;
};
declare type GetDateString = {
    (date?: Date, opts?: GetDateStringOpts): string;
    (opts?: GetDateStringOpts): string;
};
declare const getDateString: GetDateString;
export { sleep, getDateString };
//# sourceMappingURL=time.d.ts.map