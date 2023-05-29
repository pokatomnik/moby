import type { PubSub } from './PubSub';
import { SubscriberCallback } from './SubscriberCallback';
import { Subscription } from './Subscription';

export class PubSubImpl<T> implements PubSub<T> {
  private readonly _subscribers = new Set<SubscriberCallback<T>>();

  public publish(value: T) {
    for (const subscriber of this._subscribers) {
      subscriber(value);
    }
  }

  public subscribe(callback: SubscriberCallback<T>): Subscription {
    this._subscribers.add(callback);
    return {
      unsubscribe: () => {
        return this.unsubscribe(callback);
      },
    };
  }

  public unsubscribe(callback: SubscriberCallback<T>) {
    this._subscribers.delete(callback);
  }
}
