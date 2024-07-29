import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const tabItems = [
  "Todos los productos",
  "Samsung",
  "Apple",
  "Motorola",
  "Xiaomi",
];

export const Navbar = () => {
  const { setProducts, amount_products, products } = useContext(ProductContext);
  const [activeTab, setActiveTab] = useState<string>(tabItems[0]);

  const handleTabChange = (tab: string) => {
    const filteredProducts = amount_products.filter(
      (product) => product.brand.toLowerCase() === tab.toLowerCase()
    );
    setProducts(filteredProducts);
    setActiveTab(tab);
  };

  useEffect(() => {
    products.map((product) => {
      if (product.brand.toLowerCase() !== activeTab.toLowerCase()) {
        setActiveTab("Todos los productos");
      }
    });
  }, [products]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-16">
      <div
        className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
        aria-label="Manage your account"
      >
        {tabItems.map((item, idx) => {
          if( idx === 0){
            return;
          }
          return (
            <button
              key={idx}
              className={`group outline-none py-1.5 border-b-2 ${
                activeTab === item
                  ? "border-indigo-600 text-indigo-600"
                  : "border-white text-gray-500"
              }`}
              onClick={() => handleTabChange(item)}
            >
              <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
                {item}
              </div>
            </button>
          );
        })}
      </div>
      {
        tabItems.map((item, idx) => {
          if( idx === 0){
            return;
          }
          if(activeTab === item){
            return(
              <div key={idx} className="py-6">
                <p className="text-xs leading-normal">
                  {
                    activeTab === "Todos los productos" 
                      ? "Todos los productos" 
                      : `Productos de la marca ${activeTab}`
                  }
                </p>
              </div>
            );
          }  
        }
          
       )
      }
    </div>
      
  );

};
