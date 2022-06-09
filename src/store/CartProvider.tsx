import React, { useReducer } from 'react';
import { ICart } from '../types/types';
import CartContext from './cart-context';

interface ICartProviderProps {
  children: React.ReactNode;
}

type ICartAction =
  | { type: 'ADD'; item: ICart }
  | { type: 'REMOVE'; id: string };

interface ICartState {
  items: ICart[];
  totalAmount: number;
}

const defaultCartState: ICartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: ICartState, action: ICartAction) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = ({ children }: ICartProviderProps) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item: ICart) => {
    dispatchCart({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCart({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
