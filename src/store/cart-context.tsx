import React from 'react';
import { ICart } from '../types/types';

interface IContextProps {
  items: ICart[];
  totalAmount: number;
  addItem: (item: ICart) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<IContextProps>({
  items: [],
  totalAmount: 0,
  addItem: (item: ICart) => {},
  removeItem: (id: string) => {},
  clearCart: () => {},
});

export default CartContext;
