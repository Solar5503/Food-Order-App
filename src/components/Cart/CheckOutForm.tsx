import { useRef, useState } from 'react';
import { IUserData } from '../../types/types';
import styles from './CheckOutForm.module.scss';

interface ICheckOutFormProps {
  onCancel: () => void;
  onConfirm: (userData: IUserData) => void;
}
interface IFormInputsValidity {
  name: boolean;
  street: boolean;
  city: boolean;
  postalCode: boolean;
}

const isEmpty = (value: string): boolean => value.trim() === '';
const isWrongPostal = (value: string): boolean => value.trim().length !== 6;

const CheckOutForm = ({ onCancel, onConfirm }: ICheckOutFormProps) => {
  const [formInputsValidity, setFormInputsValidity] =
    useState<IFormInputsValidity>({
      name: true,
      street: true,
      city: true,
      postalCode: true,
    });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const confirmHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredName: string = nameInputRef.current?.value ?? '';
    const enteredStreet: string = streetInputRef.current?.value ?? '';
    const enteredPostalCode: number = +(postalInputRef.current?.value ?? 0);
    const enteredCity: string = cityInputRef.current?.value ?? '';

    const enteredNameIsValid: boolean = !isEmpty(enteredName);
    const enteredStreetIsValid: boolean = !isEmpty(enteredStreet);
    const enteredCityIsValid: boolean = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid: boolean = !isWrongPostal(
      String(enteredPostalCode)
    );

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid: boolean =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) return;

    onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const controlClasses = (check: boolean): string =>
    `${styles.control} ${check ? '' : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={controlClasses(formInputsValidity.name)}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={controlClasses(formInputsValidity.street)}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={controlClasses(formInputsValidity.postalCode)}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (6 characters long)!</p>
        )}
      </div>
      <div className={controlClasses(formInputsValidity.city)}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOutForm;
