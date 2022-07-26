import { useEffect, useState } from 'react';
import { IMeals } from '../../types/types';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.scss';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState<IMeals[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        `https://reactmeals-6dbef-default-rtdb.firebaseio.com/meals.json`
      );
      const responseData = await res.json();
      const loadedMeals: IMeals[] = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  const mealList: JSX.Element[] = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
