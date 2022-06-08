import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.scss';

interface IHeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton = ({ onClick }: IHeaderCartButtonProps) => {
  const { items } = useContext(CartContext);

  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item /*.amount*/;
  }, 0);

  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
