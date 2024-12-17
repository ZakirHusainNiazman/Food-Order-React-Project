import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <Header />
        <Cart />
        <Checkout/>
        <Meals />
      </UserProgressContextProvider>
    </>
  );
}

export default App;
