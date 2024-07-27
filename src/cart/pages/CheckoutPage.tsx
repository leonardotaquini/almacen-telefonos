import { NavbarUI } from "../../ui/components/NavbarUI"
import { CheckoutForm } from "../components/CheckoutForm"

export const CheckoutPage = () => {
  return (
    <div className="min-h-screen">
        <NavbarUI />
        <main className="mt-14">
                <CheckoutForm/>
        </main>
        
    </div>
  )
}
