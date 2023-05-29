import type { Publisher } from './Publisher';
import type { Subscriber } from './Subscriber';

export interface PubSub<T> extends Publisher<T>, Subscriber<T> {}
