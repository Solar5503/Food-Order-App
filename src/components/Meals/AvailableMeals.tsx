import { useEffect, useState } from 'react';
import { IMeals } from '../../types/types';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.scss';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState<IMeals[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        `https://reactmeals-6dbef-default-rtdb.firebaseio.com/meals.json`
      );
      if (!res.ok) {
        throw new Error('💥Something went wrong!💥');
      }

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
      setIsLoading(false);
    };

    fetchMeals().catch((err: any) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealList: JSX.Element[] = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));
  return (
    <section className={styles.meals}>
      <Card>{mealList}</Card>
    </section>
  );
};

export default AvailableMeals;
