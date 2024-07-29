import { useEffect, useReducer, useState } from "react";
import { ProductContext } from "./ProductContext";
import { Product, ProductState } from '../interfaces/product.interfaces';
import { ProductReducer } from "./ProductReducer";
import productsJson from "../data/products.data.json";
import { getDolarPrice } from '../../cart/helpers/divisaConvert';

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {

  const initialState: ProductState = {
    products: [],
    selectedProduct: undefined,
    productsFiltered: [],
    amount_products: [],
    isLoading: true,
  };

  
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const [realPrice, setRealPrice] = useState<number>(0);



  const dolarPrice = async () => {
    const price = await getDolarPrice();
    setRealPrice(price);
    getAllProducts();
    dispatch({ type: "SET_IS_LOADING", payload: false });
  }


  useEffect(() => {    
    dolarPrice();
  }, [state.isLoading]);



  const addProduct = (product: Product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const deleteProduct = (productId: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: productId });
  };

  const updateProduct = (productId: string, product: Product) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: { productId, product } });
  };

  const getProduct = (productId: string) => {
    dispatch({ type: "GET_PRODUCT", payload: productId });
  };

  const getAllProducts = () => {
    const products = productsJson.productos.map((product: any, i: number) => {
      const prod = { ...product, price: (product.price * realPrice)*1.30 };
      return {
        id: i.toString(),
        ...prod,
      }; 
    }
  );
    dispatch({ type: "GET_ALL_PRODUCTS", payload: products });
  };

  const setProducts = (products: Product[]) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  }

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        productsFiltered: state.productsFiltered,
        amount_products: state.amount_products,
        isLoading: state.isLoading,
        addProduct,
        deleteProduct,
        updateProduct,
        getProduct,
        getAllProducts,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
