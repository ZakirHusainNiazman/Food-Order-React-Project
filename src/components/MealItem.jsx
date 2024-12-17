import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./ui/Button";
import CartContext from "../store/CartContext";

function MealItem({ meal }) {
  const { addItem,removeItem,items } = useContext(CartContext);
  console.log(items);
  
  function handleAddItem() {
    addItem(meal);
  }
  function handleRemoveItem() {
  removeItem(meal.id);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItem}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem