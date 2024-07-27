
export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  clearCart: () => void;
};

export interface CartInitialState {
  cartItems: CartItem[];
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: CartItem }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  quantity: number;
}


export interface CheckoutFormI {
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  province: string;
  dni: string;
  zip: string;
  pay_method: string;
}
