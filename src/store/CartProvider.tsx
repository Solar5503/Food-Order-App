import React, { useReducer } from 'react';
import { ICart } from '../types/types';
import CartContext from './cart-context';

interface ICartProviderProps {
  children: React.ReactNode;
}

type ICartAction =
  | { type: 'ADD'; item: ICart }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };

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
    const updatedTotalAmount: number =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex: number = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem: ICart = state.items[existingCartItemIndex];

    let updatedItems: ICart[];

    if (existingCartItem) {
      const updatedItem: ICart = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex: number = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem: ICart = state.items[existingCartItemIndex];
    const updatedTotalAmount: number = state.totalAmount - existingItem.price;

    let updatedItems: ICart[];

    if (existingItem.amount === 1)
      updatedItems = state.items.filter((item) => item.id !== action.id);
    else {
      const updatedItem: ICart = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'CLEAR') return defaultCartState;

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
  const clearCartHandler = () => {
    dispatchCart({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
