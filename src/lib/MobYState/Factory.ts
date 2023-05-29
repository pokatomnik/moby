import type { PubSub } from './PubSub';
import { PubSubImpl } from './PubSubImpl';
import type { SubscribableState } from './SubscribableState';
import { SubscribableStateImpl } from './SubscribableStateImpl';
import type { ReactState } from './ReactState';
import { ReactStateImpl } from './ReactStateImpl';

export const pubSub = <T>(): PubSub<T> => {
  return new PubSubImpl();
};

export const stateful = <T>(initialValue: T): SubscribableState<T> => {
  return new SubscribableStateImpl(initialValue);
};

export const reactState = <T>(initialValue: T): ReactState<T> => {
  return new ReactStateImpl(initialValue);
};
