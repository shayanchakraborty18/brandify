import React from 'react'
import { useCart } from '../../context/CartContext';
import { FaCartPlus } from "react-icons/fa6";

export const AddToCart = ({product, icon=false}) => {
  const {addToCart} = useCart()

  return (
    <>
        {/* <input type="number" className="input input-sm w-24" defaultValue={1} /> */}
      <button onClick={() => addToCart(product)} className="btn btn-primary">{icon && <FaCartPlus />} {!icon && <span>Add to Cart</span>}</button>

    </>
  )
}
