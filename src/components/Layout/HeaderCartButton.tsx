import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.scss';

interface IHeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton = ({ onClick }: IHeaderCartButtonProps) => {
  const [btnIsBump, setBtnIsBump] = useState<boolean>(false);
  const { items } = useContext(CartContext);

  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnStyles: string = `${styles.button} ${btnIsBump ? styles.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) return;

    setBtnIsBump(true);

    const timer: NodeJS.Timeout = setTimeout(() => setBtnIsBump(false), 300);

    return () => clearTimeout(timer);
  }, [items]);
  return (
    <button className={btnStyles} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
