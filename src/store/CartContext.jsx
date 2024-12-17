import { act, createContext, useReducer, useState } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "add-item") {
    const updatedItems = [...state.items];
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.meal.id
    );
    const existingItem = updatedItems[existingItemIndex];
    if (existingItemIndex !== -1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.meal,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "remove-item") {
    const updatededItems = [...state.items];
    const existingItemIndex = updatededItems.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = updatededItems[existingItemIndex];
    if (existingItem.quantity === 1) {
      updatededItems.splice((item) => item.id === action.id);
    } else {
      const updatededItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updatededItems[existingItemIndex] = updatededItem;
    }
    return {
      ...state,
      items: updatededItems,
    };
  }
  if (action.type === "clear-cart") {
    return {
      ...state,
      items: [],
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(meal) {
    dispatchCartAction({
      type: "add-item",
      meal,
    });
  }
  function removeItem(id) {
    dispatchCartAction({
      type: "remove-item",
      id,
    });
  }
  function clearCart() {
    dispatchCartAction({
      type: "clear-cart",
    });
  }
  console.log(cartState);

  return (
    <CartContext.Provider
      value={{ items: cartState.items, clearCart, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
