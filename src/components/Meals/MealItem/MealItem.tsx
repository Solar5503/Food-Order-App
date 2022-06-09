import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import { IMeals } from '../../../types/types';
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';

interface IMealItemProps {
  meal: IMeals;
}

const MealItem = ({ meal }: IMealItemProps) => {
  const { addItem } = useContext(CartContext);

  const price: string = `$${meal.price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    addItem({
      id: meal.id,
      name: meal.name,
      amount: amount,
      price: meal.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
