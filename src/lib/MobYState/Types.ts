export interface PubSub<T> extends Publisher<T>, Subscriber<T> {}

export interface Publisher<T> {
  publish(value: T): void;
}

export interface ReactState<T> extends SubscribableState<T> {
  use(): T;
}

export interface State<T> {
  setValue(value: T): void;
  set value(value: T);
  get value(): T;
}

export interface SubscribableState<T> extends State<T>, Subscriber<T> {}

export interface Subscriber<T> {
  subscribe(callback: SubscriberCallback<T>): Subscription;

  unsubscribe(callback: SubscriberCallback<T>): void;
}

export interface SubscriberCallback<T> {
  (value: T): void;
}

export abstract class Store<
  TData extends object = object,
  TMethods extends object = object
> {
  /**
   * Data to be exposed to a React Component
   * Only observable fields must be here!
   */
  public abstract get data(): Readonly<TData>;

  /**
   * Methods to be exposed to a React Component
   */
  public abstract get methods(): Readonly<TMethods>;
}

export interface Subscription {
  unsubscribe(): void;
}

export interface ObservableArray<T>
  extends Iterable<T>,
    Subscriber<ObservableArray<T>> {
  pop(): T | undefined;

  push(...items: ReadonlyArray<T>): number;

  reverse(): this;

  shift(): T | undefined;

  unshift(...items: ReadonlyArray<T>): number;

  sort(compareFn: (a: T, b: T) => number): this;

  splice(start: number, deleteCount: number, ...items: ReadonlyArray<T>): this;

  concat(values: Iterable<T>): ObservableArray<T>;

  every(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): boolean;

  some(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): boolean;

  forEach(
    callback: (value: T, index: number, array: ObservableArray<T>) => void
  ): void;

  map<U>(
    predicate: (value: T, index: number, array: ObservableArray<T>) => U
  ): ObservableArray<U>;

  filter(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): ObservableArray<T>;

  find(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): T | undefined;

  findIndex(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): number;

  reduce<U>(
    callback: (
      prevValue: U,
      currentValue: T,
      index: number,
      array: ObservableArray<T>
    ) => U,
    initialValue: U
  ): U;

  reduceRight<U>(
    callback: (
      prevValue: U,
      currentValue: T,
      index: number,
      array: ObservableArray<T>
    ) => U,
    initialValue: U
  ): U;

  byIndex(index: number): T | undefined;

  use(): ObservableArray<T>;
}

[].findIndex;
