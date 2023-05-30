import * as React from 'react';
import { PubSubImpl } from './PubSubImpl';
import {
  ObservableArray,
  PubSub,
  SubscriberCallback,
  Subscription,
} from './Types';

export class ObservableArrayImpl<T> implements ObservableArray<T> {
  private readonly pubSub: PubSub<ObservableArray<T>>;

  private readonly internalArray: Array<T>;

  public constructor(source: Iterable<T>) {
    this.internalArray = Array.from(source);
    this.pubSub = new PubSubImpl();
  }

  public byIndex(index: number): T | undefined {
    return this.internalArray[index];
  }

  private *generate() {
    for (let i = 0; i < this.internalArray.length; ++i) {
      const item = this.internalArray[i];
      if (item !== undefined) {
        yield item;
      }
    }
  }

  public [Symbol.iterator](): Iterator<T, any, undefined> {
    return this.generate();
  }

  public pop(): T | undefined {
    const result = this.internalArray.pop();
    this.pubSub.publish(this);
    return result;
  }

  public push(...items: ReadonlyArray<T>): number {
    const result = this.internalArray.push(...items);
    this.pubSub.publish(this);
    return result;
  }

  public reverse(): this {
    this.internalArray.reverse();
    this.pubSub.publish(this);
    return this;
  }

  public shift(): T | undefined {
    const result = this.internalArray.shift();
    this.pubSub.publish(this);
    return result;
  }

  public unshift(...items: ReadonlyArray<T>): number {
    const result = this.internalArray.unshift(...items);
    this.pubSub.publish(this);
    return result;
  }

  public sort(compareFn: (a: T, b: T) => number): this {
    this.internalArray.sort(compareFn);
    this.pubSub.publish(this);
    return this;
  }

  public splice(
    start: number,
    deleteCount: number,
    ...items: ReadonlyArray<T>
  ): this {
    this.internalArray.splice(start, deleteCount, ...items);
    this.pubSub.publish(this);
    return this;
  }

  public concat(values: Iterable<T>): ObservableArray<T> {
    const newValuesArray = Array.from(values);
    const allValues = this.internalArray.concat(newValuesArray);
    return new ObservableArrayImpl(allValues);
  }

  public every(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): boolean {
    return this.internalArray.every((value, index) => {
      return predicate(value, index, this);
    });
  }

  public some(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): boolean {
    return this.internalArray.some((value, index) => {
      return predicate(value, index, this);
    });
  }

  public forEach(
    callback: (value: T, index: number, array: ObservableArray<T>) => void
  ): void {
    this.internalArray.forEach((value, index) => {
      return callback(value, index, this);
    });
  }

  public map<U>(
    predicate: (value: T, index: number, array: ObservableArray<T>) => U
  ): ObservableArray<U> {
    const newArray = this.internalArray.map((value, index) => {
      return predicate(value, index, this);
    });
    return new ObservableArrayImpl(newArray);
  }

  public filter(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): ObservableArray<T> {
    const newArray = this.internalArray.filter((value, index) => {
      return predicate(value, index, this);
    });
    return new ObservableArrayImpl(newArray);
  }

  public find(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): T | undefined {
    return this.internalArray.find((item, index) => {
      return predicate(item, index, this);
    });
  }

  public findIndex(
    predicate: (value: T, index: number, array: ObservableArray<T>) => unknown
  ): number {
    return this.internalArray.findIndex((item, index) => {
      return predicate(item, index, this);
    });
  }

  public reduce<U>(
    callback: (
      prevValue: U,
      currentValue: T,
      index: number,
      array: ObservableArray<T>
    ) => U,
    initialValue: U
  ): U {
    const newValue = this.internalArray.reduce<U>((acc, current, index) => {
      return callback(acc, current, index, this);
    }, initialValue);
    return newValue;
  }

  public reduceRight<U>(
    callback: (
      prevValue: U,
      currentValue: T,
      index: number,
      array: ObservableArray<T>
    ) => U,
    initialValue: U
  ): U {
    const newValue = this.internalArray.reduceRight<U>(
      (acc, current, index) => {
        return callback(acc, current, index, this);
      },
      initialValue
    );
    return newValue;
  }

  public subscribe(
    callback: SubscriberCallback<ObservableArray<T>>
  ): Subscription {
    return this.pubSub.subscribe(callback);
  }

  public unsubscribe(callback: SubscriberCallback<ObservableArray<T>>): void {
    return this.pubSub.unsubscribe(callback);
  }

  public use(): ObservableArray<T> {
    const [valueInternal, setValueInternal] = React.useState<{
      value: ObservableArray<T>;
      renders: number;
    }>(() => {
      return { renders: 0, value: this };
    });

    React.useLayoutEffect(() => {
      const subscription = this.pubSub.subscribe((thisArray) => {
        setValueInternal((oldValue) => {
          return { renders: oldValue.renders + 1, value: thisArray };
        });
      });

      return () => {
        subscription.unsubscribe();
      };
    }, []);

    return valueInternal.value;
  }
}
