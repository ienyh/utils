export type AnyFn = (...p: any[]) => any

export type Fn<P = any, R = any> = (p: P) => R

export type Callback<T = any> = Fn<T, void>
