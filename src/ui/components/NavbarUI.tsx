import { Link } from "react-router-dom"
import { useContext } from "react";
import { ProductContext } from "../../products/context/ProductContext";
import { SiMarketo } from "react-icons/si";
import './navbarUI.css';

export const NavbarUI = () => {

    const { getAllProducts } = useContext(ProductContext);

    const comeBack = () => {
       getAllProducts();
    }

  return (
      <nav className="bg-white w-full shadow p-2 fixed top-0 left-0 z-50">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex ">
              <div className="flex items-center justify-between w-full ">
                    <Link to="/" onClick={ comeBack } className="flex">
                        <SiMarketo  className="text-3xl"/>
                       <h1 className="text-2xl logo-tech mx-2 text-indigo-600">Mercado-Tech</h1>
                    </Link>
                    <Link to='/about' className="text-white p-2  bg-green-500 rounded-xl hover:animate-pulse font-medium ">
                        ¿Cómo comprar?
                    </Link>
              </div>
          </div>
      </nav>
  )
}
