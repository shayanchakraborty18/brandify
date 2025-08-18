import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import cartIcon from "../../assets/icons/bag-shopping-solid.svg";
// import usericon from "../../assets/icons/user-solid.svg";
// import { MdColorLens } from "react-icons/md";
import {
  FaBars,
  FaMobileAlt,
  FaHeadphones,
  FaTabletAlt,
  FaLaptop,
  FaUser,
  FaTv,
  FaMouse,
  FaShoppingBag,
} from "react-icons/fa";
import { MdDeviceHub, MdOutlineDevicesOther } from "react-icons/md";
import { MdOutlineColorLens } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import { BsSmartwatch, BsSpeaker } from "react-icons/bs";
import { useShop } from "../../context/ShopContext";

import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeSelector from "../../theme/ThemeSelector.jsx";
import { useAuth } from "../../context/AuthContext";
import { Brand } from "./Brand.jsx";
import { IMAGE_PATH } from "../../utils/constants.js";

export default function Navbar() {
  const { user } = useAuth();
  const [showmenu, setShowmenu] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const { showThemeSelector, setShowThemeSelector } = useTheme();

  const { getSearchproducts } = useShop();

  useEffect(() => {
    const getResult = async () => {
      if (keyword.trim().length < 3) {
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
    <header className="bg-background relative">
      <div className="bg-secondary text-text border-b border-primary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4 flex-wrap">
            <div className="flex items-center order-1">
              <Brand />
            </div>

            <div className="flex items-center gap-6 relative order-2 lg:order-3">
              <MdOutlineColorLens
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="text-card"
                size={24}
              />
              {showThemeSelector && (
                <div className="absolute top-12 left-0 bg-background border border-primary/30 z-10">
                  <div className="text-xs font-bold p-2 pb-0 uppercase">
                    Select Theme
                  </div>
                  <ThemeSelector />
                </div>
              )}
              <Link to={user ? "/account" : "/login"}>
              {user?.profileImg?.url && user.profileImg.url.startsWith("http") ? (
                <img width={24} height={24} className="rounded-full" color="text-card" src={user.profileImg.url} alt="User" />
              ) : (
                <FaUser className="text-card" size={20} />
              )}
              </Link>
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingBag className="text-card" size={20} />
                  {/* <img width={20} src={cartIcon} alt="Cart" /> */}
                  <span className="badge absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-tertiary text-card rounded-md flex items-center justify-center text-xs leading-0">
                    {totalItems}
                  </span>
                </div>
              </Link>
            </div>
            <div className="relative order-3 mt-4 lg:mt-0 w-full lg:w-auto lg:order-2">
              <div className="productFindBox text-base bg-background border rounded flex border-primary/30">
                <div className="flex items-stretch">
                  <button
                    onClick={() => setShowmenu(!showmenu)}
                    className="py-2 px-3 bg-primary/15 border-r border-primary/30"
                  >
                    <FaBars className="text-primary" size={18} />
                  </button>
                  <Link
                    className="p-2 bg-primary/15 border-r border-primary/30 flex items-center gap-1"
                    to={"/products"}
                  >
                    All <span className="hidden lg:inline">Products</span>
                  </Link>
                </div>

                <input
                  type="text"
                  placeholder="Search product here"
                  className="p-2 w-full lg:min-w-[300px]"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showmenu && (
        <div className="bg-primary/30 border-b border-primary/30">
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
                    to="products/headphone"
                  >
                    <FaHeadphones /> Headphone
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/tablet"
                  >
                    <FaTabletAlt /> Tablet
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/laptop"
                  >
                    <FaLaptop /> Laptop
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/wearable"
                  >
                    <BsSmartwatch /> Wearable
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/printer"
                  >
                    <BsPrinter /> Printer
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/monitor"
                  >
                    <FaTv /> Monitor
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/speakers"
                  >
                    <BsSpeaker /> Speakers
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 px-4 flex bg-background/50 hover:bg-background gap-2 items-center"
                    to="products/accessories"
                  >
                    <FaMouse /> Accessories
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="bg-text/40 absolute left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {searchProduct.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setKeyword("")}
                  className="border border-primary/30 rounded bg-background overflow-hidden my-4"
                >
                  <Link to={`/product/${item._id}`}>
                    <img
                      width={150}
                      src={`${IMAGE_PATH}/${item.images[0].url}`}
                    />
                  </Link>
                  <p className="p-2 text-text text-sm text-center">{item.name}</p>
                </div>
              ))}
            </div> */}

            <div className="overflow-x-auto lg:overflow-x-auto">
              <div className="flex lg:flex-nowrap gap-4">
                {searchProduct.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setKeyword("")}
                    className="border border-primary/30 rounded bg-background overflow-hidden my-4 min-w-[150px]"
                  >
                    <Link to={`/product/${item._id}`}>
                      <img
                        width={150}
                        src={`${IMAGE_PATH}/${item.images[0].url}`}
                      />
                    </Link>
                    <p className="p-2 text-text text-sm text-center">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
