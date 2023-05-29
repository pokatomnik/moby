export abstract class Store<
  TData extends object = object,
  TMethods extends object = object
> {
  /**
   * Data to be exposed to a React Component
   * Only observable fields must be here!
   */
  public abstract get data(): Readonly<TData>;

  /**
   * Methods to be exposed to a React Component
   */
  public abstract get methods(): Readonly<TMethods>;
}
