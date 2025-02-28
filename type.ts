type MyAwait<T> = T extends null | undefined
  ? T
  : T extends {
      then(onfulfilled: infer F): any;
    }
  ? F extends (value: infer V, ...args: any) => any
    ? MyAwait<V>
    : never
  : T;
type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;
type MyInstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;

type MyConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer R) => any ? R : any;

type MyOmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;

type MyNonNullable<T> = T & {};
// type MyNonNullable<T> = T extends null | undefined ? never : T;

type MyPick<T, K extends keyof T> = {
  [p in K]: T[p];
};
type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>;

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type MyPartial<T> = {
  [p in keyof T]?: T[p];
};
type MyReadonly<T> = {
  readonly [p in keyof T]: T[p];
};
type MyRecord<T extends string | number | symbol, U> = {
  [p in T]: U;
};
type MyRequired<T> = {
  [p in keyof T]-?: T[p];
};
interface MyReadonlyArray<T> {
  readonly length: number;
  readonly [n: number]: T;
}

type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any
) => infer P
  ? P
  : never;

type MyThisParameterType<T extends (this: any, ...args: any[]) => any> =
  T extends (this: infer P, ...args: any[]) => any ? P : unknown;
