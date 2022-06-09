import React from 'react';
import styles from './Input.module.scss';

interface IInputProps {
  label: string;
  input: {
    id: string;
    type: string;
    [props: string]: string | undefined;
  };
}
const Input = React.forwardRef(
  ({ label, input }: IInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <div className={styles.input}>
        <label htmlFor={input.id}>{label}</label>
        <input ref={ref} {...input} />
      </div>
    );
  }
);

export default Input;
