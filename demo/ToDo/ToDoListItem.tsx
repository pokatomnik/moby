import * as React from 'react';
import { ToDoItem } from './ToDoItem';
import styles from './ToDoListItem.module.css';

export const ToDoListItem = (props: {
  item: ToDoItem;
  onRemove: () => void;
}) => {
  const { data, methods } = props.item;
  return (
    <li className={styles.li}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={(evt) => {
          methods.setCompleted(evt.currentTarget.checked);
        }}
      />
      {data.editMode && (
        <React.Fragment>
          <input
            type="text"
            className={styles.input}
            value={data.title}
            onChange={(evt) => {
              methods.setTitle(evt.currentTarget.value);
            }}
          />
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              methods.setEditModeEnabled(false);
            }}
          >
            Apply
          </button>
        </React.Fragment>
      )}

      {!data.editMode && (
        <React.Fragment>
          <span
            className={styles.span}
            style={{
              textDecoration: data.completed ? 'line-through' : undefined,
            }}
          >
            {data.title}
          </span>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              methods.setEditModeEnabled(true);
            }}
          >
            Edit
          </button>
        </React.Fragment>
      )}
      <button
        type="button"
        onClick={() => {
          props.onRemove();
        }}
      >
        Remove
      </button>
    </li>
  );
};
