import { useEffect, useReducer } from "react";
import { CartInitialState, CartItem } from "../interfaces/cart.interfaces";
import { CartContext } from "./CartContext"
import { CartReducer } from "./CartReducer";

interface CartProviderProps {
    children: React.ReactNode;
}


export const CartProvider = ({ children }: CartProviderProps) => {

    const initialState: CartInitialState = {
        cartItems: [],
    }

    const [state, dispatch] = useReducer(CartReducer, initialState);

    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(cartItems) });
        }
    }, []);

    const addToCart = (product: CartItem) => {
        localStorage.setItem('cartItems', JSON.stringify([...state.cartItems, product]));
        dispatch({ type: 'ADD_TO_CART', payload: product });
    }

    const removeFromCart = (product: CartItem) => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems.filter((item) => item.id !== product.id)));
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    }

    const clearCart = () => {
        localStorage.removeItem('cartItems');
        dispatch({ type: 'CLEAR_CART' });
    }



  return (
    <CartContext.Provider value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    }}>
        { children }
    </CartContext.Provider>
  )
}
