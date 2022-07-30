import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import { ICart, IUserData } from '../../types/types';
import Modal from '../UI/Modal';
import styles from './Cart.module.scss';
import CartItem from './CartItem';
import CheckOutForm from './CheckOutForm';

interface ICartProps {
  onHideCart: () => void;
}

const Cart = ({ onHideCart }: ICartProps) => {
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { items, totalAmount, addItem, removeItem, clearCart } =
    useContext(CartContext);

  const totalAmountView: string = `$${totalAmount.toFixed(2)}`;
  const hasItems: boolean = items.length > 0;

  const cartItemRemoveHandler = (id: string) => removeItem(id);
  const cartItemAddHandler = (item: ICart) => addItem({ ...item, amount: 1 });
  const orderHandler = () => setIsCheckOut(true);

  const submitOrderHandler = async (userData: IUserData) => {
    try {
      setIsSubmitting(true);
      const res = await fetch(
        'https://reactmeals-6dbef-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: items,
          }),
        }
      );

      if (!res.ok) throw new Error('Server is not available!');
      setIsSubmitting(false);
      setDidSubmit(true);
      clearCart();
    } catch (err: any) {
      setIsSubmitting(false);
      setDidSubmit(false);
      setError(err.message);
    }
  };

  const cartItems: JSX.Element = (
    <ul className={styles['cart-items']}>
      {items.map((item) => (
        <CartItem
          cart={item}
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions: JSX.Element = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const CartModalContent: JSX.Element = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmountView}</span>
      </div>
      {isCheckOut && (
        <CheckOutForm onConfirm={submitOrderHandler} onCancel={onHideCart} />
      )}
      {!isCheckOut && modalActions}
    </>
  );

  const isErrorModalContent: JSX.Element = (
    <>
      <p className={styles.error}>{error}</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  const isSubmittingModalContent: JSX.Element = (
    <p className={styles.message}>Sending order data...</p>
  );

  const didSubmitModalContent: JSX.Element = (
    <>
      <p className={styles.message}>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={onHideCart}>
      {error.length !== 0 && isErrorModalContent}
      {!isSubmitting && !didSubmit && error.length === 0 && CartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting &&
        didSubmit &&
        error.length === 0 &&
        didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
