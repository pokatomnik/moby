import * as React from 'react';
import type { ReactState } from './ReactState';
import type { SubscribableState } from './SubscribableState';
import { SubscribableStateImpl } from './SubscribableStateImpl';
import { SubscriberCallback } from './SubscriberCallback';
import { Subscription } from './Subscription';

export class ReactStateImpl<T> implements ReactState<T> {
  private readonly _subscribableState: SubscribableState<T>;

  public constructor(initialValue: T) {
    this._subscribableState = new SubscribableStateImpl(initialValue);
  }

  public use = (): T => {
    const [valueInternal, setValueInternal] = React.useState(() => {
      return this._subscribableState.value;
    });

    React.useLayoutEffect(() => {
      const subscription = this._subscribableState.subscribe((value) => {
        setValueInternal(value);
      });

      return () => {
        subscription.unsubscribe();
      };
    }, []);

    return valueInternal;
  };

  public setValue(value: T): void {
    return this._subscribableState.setValue(value);
  }

  public set value(value: T) {
    this._subscribableState.value = value;
  }

  public get value(): T {
    return this._subscribableState.value;
  }

  public subscribe(callback: SubscriberCallback<T>): Subscription {
    return this._subscribableState.subscribe(callback);
  }

  public unsubscribe(callback: SubscriberCallback<T>) {
    return this._subscribableState.unsubscribe(callback);
  }
}
