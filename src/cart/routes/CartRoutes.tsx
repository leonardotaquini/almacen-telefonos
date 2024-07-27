import { Route, Routes } from "react-router-dom"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"



export const CartRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <CartPage /> } />
        <Route path="/checkout" element={ <CheckoutPage /> } />
    </Routes>
  )
}
