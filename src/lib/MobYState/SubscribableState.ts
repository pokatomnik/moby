import type { Subscriber } from './Subscriber';
import type { State } from './State';

export interface SubscribableState<T> extends State<T>, Subscriber<T> {}
