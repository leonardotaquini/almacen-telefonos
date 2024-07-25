import { ProductAction, ProductState } from "../interfaces/product.interfaces";

export const ProductReducer = (state: ProductState, action: ProductAction) => {

    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case "DELETE_PRODUCT":
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
            };
        case "UPDATE_PRODUCT":
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.productId
                        ? action.payload.product
                        : product
                ),
            };
        case "GET_PRODUCT":
            return {
                ...state,
                selectedProduct: state.products.find(
                    (product) => product.id === action.payload
                ),
            };
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                amount_products: action.payload,
            };
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
  
}
