import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.scss';

interface IMealItemForm {
  id: string;
  onAddToCart: (amount: number) => void;
}

const MealItemForm = ({ id, onAddToCart }: IMealItemForm) => {
  const [amountIsValid, setAmountIsValid] = useState<boolean>(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredAmount: string = amountInputRef.current?.value ?? '';
    const enteredAmountNumber: number = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please entered a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
