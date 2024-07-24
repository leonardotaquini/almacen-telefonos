import { useEffect, useReducer } from "react";
import { ProductContext } from "./ProductContext";
import { Product, ProductState } from "../interfaces/product.interfaces";
import { ProductReducer } from "./ProductReducer";
import productsJson from "../data/products.data.json";

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {


  useEffect(() => {
    
    getAllProducts();
    
  }, []);

  const initialState: ProductState = {
    products: [],
    selectedProduct: undefined,
    productsFiltered: [],
    amount_products: [],
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

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
      return {
        id: i.toString(),
        ...product,
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
