import { createContext } from "react";
import { CartContextType } from '../interfaces/cart.interfaces';

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
});