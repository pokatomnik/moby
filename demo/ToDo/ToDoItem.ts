import { ReactState, reactState, Store } from '../../src/lib/MobYState';

export class ToDoItem extends Store {
  private readonly title: ReactState<string>;

  private readonly completed: ReactState<boolean>;

  private readonly editMode = reactState(false);

  public readonly id = Math.random().toString(36).slice(2);

  public constructor(title: string, completed: boolean) {
    super();
    this.title = reactState(title);
    this.completed = reactState(completed);
  }

  public override get data() {
    return {
      title: this.title.use(),
      completed: this.completed.use(),
      editMode: this.editMode.use(),
    };
  }

  public override get methods() {
    return {
      setTitle: (title: string) => {
        this.title.value = title;
      },
      setEditModeEnabled: (editMode: boolean) => {
        this.editMode.value = editMode;
      },
      setCompleted: (completed: boolean) => {
        this.completed.value = completed;
      },
    };
  }
}
