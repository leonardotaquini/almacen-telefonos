// ShoppingCart.js
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCart = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const handleCartClick = () => {
        navigate("/cart");
    }
  return (
    <button className="fixed bottom-12 right-3 bg-indigo-500 p-4 rounded-full flex  items-center justify-center"
            onClick={ handleCartClick }>
      <FaShoppingCart size={20} className="text-gray-100"/>
      {cartItems.length > 0 && (
        <div className="absolute top-0 right-0 bg-indigo-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
          {cartItems.length}
        </div>
      )}
    </button>
  );
};
