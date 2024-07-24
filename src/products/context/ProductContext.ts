import { createContext } from "react";
import { ProductContextType } from "../interfaces/product.interfaces";


export const ProductContext = createContext<ProductContextType>( {} as ProductContextType );