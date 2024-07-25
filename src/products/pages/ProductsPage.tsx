import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Navbar } from "../components/Navbar";
import { NavbarUI } from "../../ui/components/NavbarUI";
import { ShoppingCart } from "../../cart/components/Cart";
import { Spinner } from "../../ui/components/Spinner";

export const ProductsPage = () => {
  const { products, isLoading } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calcula el índice de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcula el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    const newPages = [];
    for (let i = 1; i <= totalPages; i++) {
      newPages.push(i.toString());
    }
    setPages(newPages);
  }, [totalPages]);

    // Resetear la paginación a la página 1 cada vez que cambian los productos
    useEffect(() => {
      setCurrentPage(1);
    }, [products]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10 px-4 text-gray-600 md:px-8">
      <NavbarUI />
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid place-items-center">
          <div className="grid grid-cols-12 justify-around items-center">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            ) : (
              <p className="col-span-12 text-center text-blue-500">
                Seleccione un indice correcto
              </p>
            )}
          </div>
          <div
            className="hidden items-center justify-between sm:flex my-2 shadow-xl p-2 rounded-lg"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              className="hover:text-indigo-600 flex items-center gap-x-2"
            >
              <MdNavigateBefore className="hover:text-blue-500" />
            </button>
            <ul className="flex items-center gap-1">
              {pages.map((item) => (
                <li key={item} className="text-sm">
                  {item === "..." ? (
                    <div>{item}</div>
                  ) : (
                    <button
                      onClick={() => handlePageChange(Number(item))}
                      aria-current={
                        currentPage === Number(item) ? "page" : false
                      }
                      className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                        currentPage === Number(item)
                          ? "bg-indigo-50 text-indigo-600 font-medium"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              className="hover:text-indigo-600 flex items-center gap-x-2"
            >
              <MdNavigateNext />
            </button>
          </div>
          {/* On mobile version */}
          <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden my-2 shadow-xl p-2 rounded-lg">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
            >
              <MdNavigateBefore />
            </button>
            <div className="font-medium px-2">
              Pagina {currentPage} de {pages.length}
            </div>
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
            >
              <MdNavigateNext />
            </button>
          </div>
          <ShoppingCart />
        </div>
      )}
    </div>
  );
};
