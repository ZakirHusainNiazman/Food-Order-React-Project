import useHttp from '../hooks/useHttp';
import Error from './Error';
import MealItem from './MealItem';

const reqConfig = {};

function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals",reqConfig,[]);
  console.log("loadedMeals = "+loadedMeals);
  
  if (isLoading) {
    return <p className='center'>Fetching meals...</p>;
  }

  if (error) {
    return <Error title='Faild to fetch meal' message={error}/>
  }
    
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => <MealItem meal={meal} />)}
    </ul>
  );
}

export default Meals