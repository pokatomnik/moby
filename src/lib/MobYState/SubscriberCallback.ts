export interface SubscriberCallback<T> {
  (value: T): void;
}
