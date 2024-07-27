import { CartItem } from "../interfaces/cart.interfaces";

interface User {
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  province: string;
  dni: string;
  zip: string;
  pay_method: string;
}

export const sendMessage = (cartItems: CartItem[], user: User) => {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const message = `
Hola, soy ${user.name} y quiero realizar una compra.%0A
Mi email es ${user.email} y mi número de teléfono es ${user.whatsapp}.%0A
Mi dirección es ${user.address} en ${user.city}, ${user.province}.%0A
Mi DNI es ${user.dni} y mi código postal es ${user.zip}.%0A
Metodo de pago: ${user.pay_method}.%0A
Mis productos son:%0A
${cartItems.map((item) => `- ${item.name} (${item.quantity} x $${item.price})`).join('%0A')}
%0ATotal: $${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}%0A
  `;

  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
};
