import { IMeals } from '../../../types/types';
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';

interface IMealItemProps {
  meal: IMeals;
}

const MealItem = ({ meal }: IMealItemProps) => {
  const price: string = `$${meal.price.toFixed(2)}`;
  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} />
      </div>
    </li>
  );
};

export default MealItem;
