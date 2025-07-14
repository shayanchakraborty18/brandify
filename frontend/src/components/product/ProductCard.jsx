import React from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "./AddToCart";

export const ProductCard = ({ product }) => {

  // const {id, name, new_price, old_price, image} = product
  return (
    <div className="productCard rounded-md shadow-md p-4">
      <Link to={`/product/${product.id}`}>
        <div className="flex justify-center">
          <img onClick={() => window.scrollTo(0, 0)} src={product.image} alt="" />
        </div>
      </Link>
      <h4 className="text-text font-medium my-2">{product.name}</h4>
      <div className="flex justify-center gap-2">
        <p className="text-primary font-bold">${product.price}</p>
        {/* <p className="line-through text-text/50">${product.old_price}</p> */}
      </div>
      <div className='flex justify-center'>
        {/* <AddToCart product={product} /> */}
        {/* <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button> */}
        {/* <button className="btn btn-outline-primary">View</button> */}
      </div>
    </div>
  );
};
