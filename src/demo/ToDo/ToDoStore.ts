import { reactState } from '../../lib/MobYState';
import { Store } from '../../lib/MobYState/Store';
import { ToDoItem } from './ToDoItem';

export class ToDoStore extends Store {
  private readonly todoItems = reactState<Array<ToDoItem>>([]);

  public override get data() {
    return {
      items: this.todoItems.use(),
    };
  }

  public override get methods() {
    return {
      addTodoItem: (title: string) => {
        this.todoItems.value = this.todoItems.value.concat(
          new ToDoItem(title, false)
        );
      },
      removeToDoItem: (todoItem: ToDoItem) => {
        this.todoItems.value = this.todoItems.value.filter(
          (currentToDoItem) => {
            return currentToDoItem.id !== todoItem.id;
          }
        );
      },
    };
  }
}
