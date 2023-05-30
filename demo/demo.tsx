import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Form } from './Form';
import { ToDoList } from './ToDo';

const appRoot = document.getElementById('root');

if (appRoot) {
  ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
      <Form />
      <ToDoList />
    </React.StrictMode>
  );
} else {
  console.error('Can\t find document root');
}
