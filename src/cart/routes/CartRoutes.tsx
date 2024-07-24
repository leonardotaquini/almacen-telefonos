import { Route, Routes } from "react-router-dom"
import { CartPage } from "../pages/CartPage"



export const CartRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <CartPage /> } />
    </Routes>
  )
}
