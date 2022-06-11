import { ICart } from '../../types/types';
import styles from './CartItem.module.scss';

interface ICartItemProps {
  cart: ICart;
  onAdd: () => void;
  onRemove: () => void;
}

const CartItem = ({ cart, onAdd, onRemove }: ICartItemProps) => {
  const price: string = `$${cart.price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{cart.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x {cart.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
