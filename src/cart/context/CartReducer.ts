import { CartAction, CartInitialState } from "../interfaces/cart.interfaces";


export const CartReducer = (state:CartInitialState, action: CartAction) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case 'REMOVE_FROM_CART':
            const existingCartItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingCartItem?.quantity && existingCartItem.quantity > 1) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item),
                };
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems.filter((item) => item.id !== action.payload.id)));
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
            };
        case 'LOAD_CART':
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
}