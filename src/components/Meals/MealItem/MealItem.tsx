import { IMeals } from '../../../types/types';
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';

interface IMealItenProps {
  meal: IMeals;
}

const MealItem = ({ meal }: IMealItenProps) => {
  const price: string = `$${meal.price.toFixed(2)}`;
  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
        <div>
          <MealItemForm />
        </div>
      </div>
    </li>
  );
};

export default MealItem;
