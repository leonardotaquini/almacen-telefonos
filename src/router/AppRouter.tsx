import { Route, Routes } from 'react-router-dom'
import { ProductsRouter } from '../products/router/ProductsRouter'
import { CartRoutes } from '../cart/routes/CartRoutes'
import { AboutPage } from '../ui/pages/AboutPage'

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" element={<ProductsRouter />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart/*" element={<CartRoutes />} />
        <Route path="*" element={<h1 className="grid place-items-center font-bold h-screen">Pagina no encontrada</h1>} />
    </Routes>
  )
}
