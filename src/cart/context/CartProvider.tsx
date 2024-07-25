import { useEffect, useReducer } from "react";
import { CartInitialState, CartItem } from "../interfaces/cart.interfaces";
import { CartContext } from "./CartContext"
import { CartReducer } from "./CartReducer";
import { useToast } from "../../ui/hooks/useToast";

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const toast = useToast();

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

    useEffect(() => {
        if( state.cartItems.length === 0 ){
            return;
        };
        localStorage.setItem('cartItems', JSON.stringify([...state.cartItems]));
    }, [state.cartItems]);

    const addToCart = (product: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        toast('Producto agregado al carrito', 'success');
    }

    const removeFromCart = (product: CartItem) => {
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
