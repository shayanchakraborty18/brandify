import React from "react";
import { useCart } from "../../context/CartContext";
import { FaCartPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

export const AddToCart = ({ product, icon = false }) => {
  const { addToCart } = useCart();

  const handleSubmit = () => {
    addToCart(product);
    toast.success("Product added to cart!");
  };

  return (
    <>
      {/* <input type="number" className="input input-sm w-24" defaultValue={1} /> */}
      <button onClick={handleSubmit} className="btn btn-primary cursor-pointer">
        {icon && <FaCartPlus />} {!icon && <span>Add to Cart</span>}
      </button>
    </>
  );
};
