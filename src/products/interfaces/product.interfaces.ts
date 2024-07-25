export interface ProductContextType {
  products: Product[];
  productsFiltered: Product[];
  amount_products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (productId: string, product: Product) => void;
  getProduct: (productId: string) => void;
  getAllProducts: () => void;
  setProducts: (products: Product[]) => void;
  isLoading: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string;
}

export interface ProductState {
  products: Product[];
  amount_products: Product[];
  selectedProduct: Product | undefined;
  productsFiltered: Product[];
  isLoading: boolean;
}

export type ProductAction =
  | {
      type: "ADD_PRODUCT";
      payload: Product;
    }
  | {
      type: "DELETE_PRODUCT";
      payload: string;
    }
  | {
      type: "UPDATE_PRODUCT";
      payload: {
        productId: string;
        product: Product;
      };
    }
  | {
      type: "GET_PRODUCT";
      payload: string;
    }
  | {
      type: "GET_ALL_PRODUCTS";
      payload: Product[];
    }
  | {
      type: "SET_PRODUCTS";
      payload: Product[];
    }
  | {
      type: "SET_IS_LOADING";
      payload: boolean;
    };
