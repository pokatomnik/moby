import type { SubscribableState } from './SubscribableState';

export interface ReactState<T> extends SubscribableState<T> {
  use(): T;
}
