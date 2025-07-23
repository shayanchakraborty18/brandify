import React from "react";
import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons/bag-shopping-solid.svg";
import usericon from "../../assets/icons/user-solid.svg"
// import { useCart } from "@/context/CartContext";

export default function Navbar() {
  // const { cartItems } = useCart();

  // const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
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
          <div>
            <ul className="flex items-center gap-4 uppercase">
              <li>
                <Link to="products/mobile">Mobile</Link>
              </li>
            </ul>
          </div>
          
          <div className="flex items-center gap-6">
            {/* <button className="btn btn-outline btn-primary">Login</button> */}
            <Link to="/login">
                <img width={20} src={usericon} alt="User" />
            </Link>
            <Link to="/cart">
              <div className="relative">
                <img width={20} src={cartIcon} alt="Cart" />
                {/* <span className="badge absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-primary text-white rounded-md flex items-center justify-center text-xs leading-0">{totalItems}</span> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
