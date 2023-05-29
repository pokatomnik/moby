import * as React from 'react';
import { ToDoStore } from './ToDoStore';
import { ToDoListItem } from './ToDoListItem';
import styles from './ToDoList.module.css';

export const ToDoList = () => {
  const [{ data, methods }] = React.useState(() => {
    return new ToDoStore();
  });

  return (
    <div className={styles.list}>
      <h3>ToDo list demo</h3>
      <button
        onClick={() => {
          methods.addTodoItem('To be done');
        }}
      >
        Add ToDo
      </button>
      <ul>
        {data.items.map((todoItem) => {
          return (
            <ToDoListItem
              item={todoItem}
              key={todoItem.id}
              onRemove={() => {
                methods.removeToDoItem(todoItem);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};
