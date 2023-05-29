import * as React from 'react';
import styles from './Form.module.css';
import { FormState } from './FormState';

export const Form = () => {
  const [{ data, methods }] = React.useState(() => {
    return new FormState();
  });

  return (
    <form
      className={styles.form}
      onSubmit={(evt) => {
        evt.preventDefault();
        methods.submit();
      }}
    >
      <h3>Toggle and Form demo</h3>
      <label>
        <input
          type="checkbox"
          checked={data.formShown}
          onChange={(evt) => {
            methods.setFormShown(evt.currentTarget.checked);
          }}
        />
        <span>Show/Hide</span>
      </label>
      {data.formShown && (
        <React.Fragment>
          <input
            type="text"
            placeholder="First name"
            value={data.firstName}
            onChange={(evt) => {
              methods.setFirstName(evt.currentTarget.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Second name"
            value={data.lastName}
            onChange={(evt) => {
              methods.setLastName(evt.currentTarget.value);
            }}
          ></input>
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(evt) => {
              methods.setEmail(evt.currentTarget.value);
            }}
          ></input>
        </React.Fragment>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
