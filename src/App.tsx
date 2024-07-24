import { CartProvider } from "./cart/context/CartProvider"
import { ProductProvider } from "./products/context/ProductProvider"
import { AppRouter } from "./router/AppRouter"

function App() {

  return (
    <CartProvider>
      <ProductProvider>
        <AppRouter />
      </ProductProvider>
    </CartProvider>
  )
}

export default App
