import { Store, reactArray } from '../../lib/MobYState';
import { ToDoItem } from './ToDoItem';

export class ToDoStore extends Store {
  private readonly todoItems = reactArray<ToDoItem>([]);

  public override get data() {
    return {
      items: this.todoItems.use(),
    };
  }

  public override get methods() {
    return {
      addTodoItem: (title: string) => {
        this.todoItems.push(new ToDoItem(title, false));
      },
      removeToDoItem: (todoItem: ToDoItem) => {
        const index = this.todoItems.findIndex((item) => {
          return item.id === todoItem.id;
        });
        if (index >= 0) {
          this.todoItems.splice(index, 1);
        }
      },
    };
  }
}
