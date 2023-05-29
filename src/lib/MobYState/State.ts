export interface State<T> {
  setValue(value: T): void;
  set value(value: T);
  get value(): T;
}
