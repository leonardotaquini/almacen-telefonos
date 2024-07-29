import { Product } from "../interfaces/product.interfaces";
import ProductImage from "../../assets/card-image.jpeg";
import { useContext } from "react";
import { CartContext } from "../../cart/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = ( prod: Product) => {
    addToCart({...prod, quantity: 1});
  }

  function formatPrice(price: number): string {
    // Verificar si el precio es un número válido
    if (isNaN(price)) {
      throw new Error('El valor ingresado no es un número válido');
    }
  
    // Formatear el número a dos decimales y agregar PUNTOS como separadores de miles
    const formattedPrice = price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  
    return formattedPrice;
  }


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2 bg-white col-span-12 lg:col-span-4   flex flex-col h-96 border">
      <img
        className="w-full h-1/2  hover:scale-105 hover:transform hover:transition-transform hover:duration-500 "
        src={product.image || ProductImage}
        alt={product.name}
        style={{ objectFit: "contain" }} // Add this line to make the image fit completely
      />
      <div className="flex-1 flex flex-col justify-between px-6 py-3">
        <div>
          <div className="font-bold text-sm mb-2 text-center">{product.name}</div>
          <div className="flex items-center text-center justify-center">
            <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-indigo-700 mr-2 mb-2">
              {product.category}
            </span>
            <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-indigo-700 mr-2 mb-2">
              {product.brand}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center sm:flex-col lg:flex-row space-x-1">
          <span className="block text-gray-950-400 text-xl font-bold">
            ${formatPrice(product.price)}
          </span>
          <button className="bg-indigo-200 rounded-lg  p-3 text-xs font-semibold text-zinc-800 hover:bg-green-300 hover:text-gray-900 uppercase"
                  onClick={ ()=> handleAddToCart(product) }>
              Agregar al carrito
          </button>
        </div>
        <div className="flex space-x-3">
          <p className="text-xs text-green-600 font-semibold">30% off</p>
          <p className="text-xs text-green-600 line-through font-semibold">{`$${ formatPrice(product.price * 1.43)}`}</p>
        </div>
      </div>
    </div>
  );
};
