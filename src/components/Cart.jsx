import { useContext } from "react"
import Modal from "./ui/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
    const { items,addItem,removeItem } = useContext(CartContext);
    const cartTotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
    const { progress, hideCart,showCheckout } = useContext(UserProgressContext);
    
    function handleCloseCart() {
        hideCart();
    }
    
  return (
    <Modal className="cart" open={progress === "cart"} onClose={progress === "cart" ? hideCart :null}>
      <p>Your Cart</p>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onDecrease={() => removeItem(item.id)}
            onIncrease={() => addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart