import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import { ICart } from '../../types/types';
import Modal from '../UI/Modal';
import styles from './Cart.module.scss';
import CartItem from './CartItem';

interface ICartProps {
  onHideCart: () => void;
}

const Cart = ({ onHideCart }: ICartProps) => {
  const { items, totalAmount } = useContext(CartContext);

  const totalAmountView: string = `$${totalAmount.toFixed(2)}`;
  const hasItems: boolean = items.length > 0;

  const cartItemRemoveHandler = (id: string) => {};
  const cartItemAddHandler = (item: ICart) => {};

  const cartItems = (
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
  return (
    <Modal onClose={onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmountView}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onHideCart}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
