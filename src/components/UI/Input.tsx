import styles from './Input.module.scss';

interface IInputProps {
  label: string;
  input: {
    id: string;
    type: string;
    [props: string]: string | undefined;
  };
}
const Input = ({ label, input }: IInputProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} />
    </div>
  );
};

export default Input;
