import { NavbarUI } from "../components/NavbarUI"
import { FaShoppingCart, FaCheckSquare } from "react-icons/fa";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { FaTruckArrowRight } from "react-icons/fa6";

export const AboutPage = () => {

  const features = [
      {
          icon: <FaShoppingCart className="text-3xl text-indigo-600" />,
          title: "1. Agregá tu producto al carrito",
          desc: "Selecciona los productos que deseas comprar y agregalos al carrito de compras."
      },
      {
          icon: <BiSolidSpreadsheet className="text-3xl text-indigo-600" />,
          title: "2. Completá los datos solicitados",
          desc: "Rellená los campos con tus datos personales y de envío."
      },
      {
          icon: <FaCheckSquare className="text-3xl text-indigo-600" />,
          title: "3. Aguarda la confirmación de tu compra",
          desc: "Una vez completado el proceso, recibirás un mensaje de confirmación con los detalles de tu compra via WhatsApp."
      },
      {
          icon: <FaTruckArrowRight className="text-3xl text-indigo-600" />,
          title: "4. Abona y recibí tu producto",
          desc: "Una vez confirmado tu pedido, según el metodo de pago seleccionado, podrás elegir retirar tu compra en uno de nuestros puntos o recibirlo en tu domicilio."
      },
      
  ]

  return (
    <div className="min-h-screen">
      <NavbarUI />
      <main className="h-full pt-14">
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className=" max-w-2xl mx-auto sm:text-center">
                    <div className="relative z-10">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Te explicamos el proceso de compra en nuestra tienda
                        </h3>
                        <p className="mt-3 text-slate-500">
                            A continuación te mostraremos los pasos y requisitos para hacer una compra.
                        </p>
                    </div>
                </div>
                <div className="relative mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="bg-white space-y-3 p-4 border rounded-lg">
                                    <div className="text-indigo-600 pb-3">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
      </main>
    </div>
  )
}