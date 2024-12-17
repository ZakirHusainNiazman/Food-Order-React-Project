import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './ui/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

function Header() {
  const { items } = useContext(CartContext);
  const {progress,showCart}=useContext(UserProgressContext);
  const itemsInTheCart = items.reduce((total, item) => total + item.quantity, 0)
  
  function handleShowCart() {
    showCart();
  }
    return (
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="" />
          <h1>niazman food</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart} >Cart({itemsInTheCart})</Button>
        </nav>
      </header>
    );
}

export default Header