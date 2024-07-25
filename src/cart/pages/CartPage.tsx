import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { NavbarUI } from "../../ui/components/NavbarUI";
import { EmptyAnimation } from "../components/EmptyAnimation";

export const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  return (
    <>
      <NavbarUI />
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-20">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Carrito de compras
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              to="/"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Agregar mas productos
            </Link>
          </div>
        </div>

          {
            cartItems.length === 0 
              ? <EmptyAnimation />
              : <div className="mt-12 relative h-max overflow-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 pr-6">Nombre</th>
                    <th className="py-3 pr-6">Categoria</th>
                    <th className="py-3 pr-6">Marca</th>
                    <th className="py-3 pr-6">Cantidad</th>
                    <th className="py-3 pr-6">Total</th>
                    <th className="py-3 pr-6"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {cartItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="pr-6 py-4 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap">{item.brand}</td>
                      <td className="pr-6 py-4 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap">
                        $ {item.price * item.quantity}
                      </td>
                      <td className="text-right whitespace-nowrap space-x-4">
                        <button
                          className="text-indigo-600 font-medium"
                          onClick={() => removeFromCart({...item, quantity: 1})}
                        >
                          <FaMinus />
                        </button>
                        <button className="text-indigo-600 font-medium"
                                onClick={ ()=> addToCart({...item, quantity: 1})}>
                          <FaPlus />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

        
      </div>
    </>
  );
};
