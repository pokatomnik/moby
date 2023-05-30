import type {
  Subscription,
  SubscriberCallback,
  PubSub,
  SubscribableState,
} from './Types';
import { PubSubImpl } from './PubSubImpl';

export class SubscribableStateImpl<T> implements SubscribableState<T> {
  private readonly _pubSub: PubSub<T> = new PubSubImpl<T>();

  public constructor(private _value: T) {}

  public setValue(value: T): void {
    this._value = value;
    this._pubSub.publish(value);
  }

  public set value(value: T) {
    this._value = value;
    this._pubSub.publish(value);
  }

  public get value(): T {
    return this._value;
  }

  public subscribe(callback: SubscriberCallback<T>): Subscription {
    return this._pubSub.subscribe(callback);
  }

  public unsubscribe(callback: SubscriberCallback<T>) {
    return this._pubSub.unsubscribe(callback);
  }
}
