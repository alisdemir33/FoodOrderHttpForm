import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/httpHook'
import { useEffect,useState } from 'react';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {



  const [meals, setMeals] = useState([]);
  
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {

    const transformMeals = (meals) => {
      const loadedMeals = [];

      for (const meal in meals) {
        loadedMeals.push({ id: meals[meal].id, 
          name: meals[meal].name,
          desc:meals[meal].desc, 
          price: meals[meal].price });
      }

      setMeals(loadedMeals);

    };   

    fetchTasks(
      {
        url: 'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      }, transformMeals);
  }, [fetchTasks]);

 let mealsList=<p>loading...</p>;
   if(!isLoading && !error && meals!==null ){
  
    mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.desc}
        price={meal.price}
      />
    ));
   }
  
  console.log(mealsList);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
