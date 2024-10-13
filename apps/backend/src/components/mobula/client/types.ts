export type KeyValue<K extends string | number, V> = {
  [key in K]: V;
};
