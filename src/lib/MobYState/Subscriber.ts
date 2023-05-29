import type { SubscriberCallback } from './SubscriberCallback';
import type { Subscription } from './Subscription';

export interface Subscriber<T> {
  subscribe(callback: SubscriberCallback<T>): Subscription;

  unsubscribe(callback: SubscriberCallback<T>): void;
}
