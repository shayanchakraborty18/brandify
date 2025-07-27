import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons/bag-shopping-solid.svg";
import usericon from "../../assets/icons/user-solid.svg";
import {
  FaBars,
  FaMobileAlt,
  FaHeadphones,
  FaTabletAlt,
  FaLaptop,
  FaCamera,
  FaTv,
  FaMouse,
} from "react-icons/fa";
import { BsSmartwatch, BsSpeaker } from "react-icons/bs";
import { useShop } from "../../context/ShopContext";

import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [showmenu, setShowmenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);

  const { getSearchproducts } = useShop();

  useEffect(() => {
    const getResult = async () => {
      if (keyword.trim().length < 2) {
        setSearchProduct([]);
        return;
      }
      const search = await getSearchproducts(keyword);
      setSearchProduct(search);
    };

    getResult();
  }, [keyword]);

  const { cartItem } = useCart();

  const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <div className="bg-primary/10 text-text border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold">
              <Link to="/">
                <h1 className="font-bold">
                  Brand<span className="text-primary">ify</span>
                </h1>
              </Link>
            </div>
            <div className="relative">
              <div className="productFindBox text-base bg-background border rounded flex border-primary/30">
                <button
                  onClick={() => setShowmenu(!showmenu)}
                  className="flex items-center gap-2 p-2 bg-primary/15 border-r border-primary/30"
                >
                  <FaBars className="text-primary" size={18} />
                  All Products
                </button>

                <input
                  type="text"
                  placeholder="Search product here"
                  className="p-2 min-w-[300px]"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* <button className="btn btn-outline btn-primary">Login</button> */}
              <Link to="/login">
                <img width={20} src={usericon} alt="User" />
              </Link>
              <Link to="/cart">
                <div className="relative">
                  <img width={20} src={cartIcon} alt="Cart" />
                  <span className="badge absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-primary text-white rounded-md flex items-center justify-center text-xs leading-0">{totalItems}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showmenu && (
        <div className="bg-primary/20 border-b border-primary/20">
          <div className="container mx-auto px-4">
            <div className="overflow-x-auto">
              <ul className="flex items-center justify-center gap-[1px] uppercase text-sm min-w-max">
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <FaMobileAlt /> Mobile
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <FaHeadphones /> Headphone
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <FaTabletAlt /> Tablet
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <FaLaptop /> Laptop
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <BsSmartwatch /> Wearable
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <FaCamera /> Camera
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <FaTv /> Television
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <BsSpeaker /> Speaker
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/mobile"
                  >
                    <FaMouse /> Accessories
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="bg-primary/40 absolute left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {searchProduct.map((item) => (
                <div key={item._id} onClick={()=> setKeyword("")} className="border border-primary/20 rounded bg-background overflow-hidden my-2">
                  <Link to={`/product/${item._id}`}>
                    <img
                      width={200}
                      src={`http://localhost:3000/${item.images[0].url}`}
                    />
                  </Link>
                  <p className="p-2">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
