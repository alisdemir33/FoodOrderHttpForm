import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/httpHook'
import { useEffect, useState } from 'react';

/* const DUMMY_MEALS = [
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
]; */

const AvailableMeals = () => {


  const [meals, setMeals] = useState([]);
  const [loading, setIsloading] = useState(true);
  const[httpError,setHttpError]=useState();

  

  useEffect(async () => {

   const  fetchMeals = async () =>{
   const response =  await fetch('https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/MealsM.json')
  
  if(!response.ok){
    throw new Error('SWH:)')
  }
   const repsonseData = await response.json();
 
  const loadedMeals =[];
  for(const key in repsonseData){
    loadedMeals.push({ 
      id : key, 
      name : repsonseData[key].name , 
      description:repsonseData[key].description,
      price:repsonseData[key].price})
  }

  setMeals(loadedMeals);
  setIsloading(false);
  }

   fetchMeals().catch(error => {
    setIsloading(false);
    setHttpError(error.message);
   }) ;
    
  

  }, []) 
  
  ;debugger
  if (loading) {
    return <section className={classes.MealsLoading}><p>Loading..</p></section>  
  }
  if(httpError){
    return <section className={classes.MealsError}><p>{httpError}</p></section>  
  }

  if(!loading && !httpError){

  let  mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.desc}
        price={meal.price}
      />
    ));
  

  return (
   
    <section className={classes.meals}>
       <Card>
         <ul>{mealsList}</ul>
       </Card>
     </section>
   );
}
  
};

export default AvailableMeals;
