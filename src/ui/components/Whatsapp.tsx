// ShoppingCart.js
import { FaWhatsapp } from "react-icons/fa";

export const Whatsapp = () => {

  const handleCartClick = () => {
    window.open("https://wa.me/3704267450", "_blank");
  };
  return (
    <button
      className="fixed bottom-28 right-3 bg-green-500 p-4 rounded-full flex  items-center justify-center hover:animate-spin"
      onClick={handleCartClick}
    >
      <FaWhatsapp size={20} className="text-gray-100" />
    </button>
  );
};
