import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const tabItems = [
  "Samsung",
  "Apple",
  "Motorola",
  "Xiaomi",
  "Stanley",
  "JBL",
  "PlayStation",
];

export const Navbar = () => {

  const { setProducts, amount_products } = useContext(ProductContext);
  const [activeTab, setActiveTab] = useState<string>(tabItems[0]);    


  const handleTabChange = (tab: string) => {
    const filteredProducts = amount_products.filter((product) => product.brand.toLowerCase() === tab.toLowerCase());
    setProducts(filteredProducts);
    setActiveTab(tab);
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-16">
      <div
        className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
        aria-label="Manage your account"
      >
        {tabItems.map((item, idx) => (
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
        ))}
      </div>
      {tabItems.map((item, idx) => (
        activeTab === item && (
          <div key={idx} className="py-6">
            <p className="text-xs leading-normal">
              Productos de <b>{item}</b>:
            </p>
          </div>
        )
      ))}
    </div>
  );
};


