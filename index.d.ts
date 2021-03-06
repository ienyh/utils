
declare type Fn<P = any, R = any> = (p?: P) => R

declare type Callback<T = any> = Fn<T, void>
