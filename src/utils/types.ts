/**
 * Override T1 with T2
 * @param T1 - base
 * @param T2 - new
 * @returns Overridden type
 */
type Override<T1, T2> = Omit<T1, keyof T2> & T2;

/**
 * TのプロパティPを必須にする
 * @param T - base
 * @param P - Required
 * @returns Overridden type
 */
type RequiredParts<T, P extends keyof T> = Override<T, Pick<Required<T>, P>>

export type { Override, RequiredParts }
