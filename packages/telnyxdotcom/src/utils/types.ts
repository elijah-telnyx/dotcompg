export type DeepNullable<T> = { [K in keyof T]: DeepNullable<T[K]> | null };

export type NonNullableProperties<Type> = {
  [Key in keyof Type]-?: NonNullable<Type[Key]>;
};
