import { Route, Routes } from "react-router-dom"
import { ProductsPage } from "../pages/ProductsPage"

export const ProductsRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="*" element={<h1 className="grid place-items-center font-bold h-screen">Pagina no encontrada</h1>} />
    </Routes>
  )
}
