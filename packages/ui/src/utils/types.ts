export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type AwaitedReturn<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

export type ValueOf<T> = T[keyof T];
