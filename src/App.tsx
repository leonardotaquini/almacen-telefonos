import { SnackbarProvider } from "notistack"
import { CartProvider } from "./cart/context/CartProvider"
import { ProductProvider } from "./products/context/ProductProvider"
import { AppRouter } from "./router/AppRouter"

function App() {

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <CartProvider>
        <ProductProvider>
          <AppRouter />
        </ProductProvider>
      </CartProvider>
    </SnackbarProvider>
  )
}

export default App
