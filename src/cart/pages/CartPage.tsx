import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { NavbarUI } from "../../ui/components/NavbarUI";
import { EmptyAnimation } from "../components/EmptyAnimation";

export const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  const formatPrice = (price: number): string => {
    if (isNaN(price)) {
      throw new Error("El valor ingresado no es un número válido");
    }
    const formattedPrice = price.toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formattedPrice;
  };

  const calculateTotal = () => {
    return formatPrice(
      cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );
  };

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

        {cartItems.length === 0 ? (
          <EmptyAnimation />
        ) : (
          <div className="mt-12 relative h-max overflow-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-gray-600 font-medium border-b">
                <tr className="bg-indigo-50">
                  <th className="py-3 pr-6 px-2">Nombre</th>
                  <th className="py-3 pr-6 text-center">Cant.</th>
                  <th className="py-3 pr-6 text-center">Accion</th>
                  <th className="py-3 pr-10 r">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {cartItems.map((item, idx) => (
                  <tr key={idx} className="">
                    <td className="capitalize py-5">{item.name}</td>

                    <td className="text-center py-5">{item.quantity}</td>

                    <td className="text-center space-x-3  xs:py-5 md:py-3 py-5">
                      <button
                        className="text-indigo-600 font-medium"
                        onClick={() => removeFromCart({ ...item, quantity: 1 })}
                      >
                        <FaMinus />
                      </button>
                      <button
                        className="text-indigo-600 font-medium"
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                      >
                        <FaPlus />
                      </button>
                    </td>

                    <td className="xs:py-5 md:py-3">
                      ${formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-indigo-50">
                  <td colSpan={3} className="text-right py-3 font-medium"></td>
                  <td className="py-3 font-bold text-indigo-500 text-md px-1">
                    ${""}
                    {calculateTotal()}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-8">
              <Link
                to={"checkout"}
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Confirmar pedido
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
