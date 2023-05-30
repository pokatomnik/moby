import type {
  PubSub,
  SubscribableState,
  ReactState,
  ObservableArray,
} from './Types';
import { PubSubImpl } from './PubSubImpl';
import { SubscribableStateImpl } from './SubscribableStateImpl';
import { ReactStateImpl } from './ReactStateImpl';
import { ObservableArrayImpl } from './ObservableArrayImpl';

export const pubSub = <T>(): PubSub<T> => {
  return new PubSubImpl();
};

export const stateful = <T>(initialValue: T): SubscribableState<T> => {
  return new SubscribableStateImpl(initialValue);
};

export const reactState = <T>(initialValue: T): ReactState<T> => {
  return new ReactStateImpl(initialValue);
};

export const reactArray = <T>(
  initialState: Iterable<T>
): ObservableArray<T> => {
  return new ObservableArrayImpl(initialState);
};
