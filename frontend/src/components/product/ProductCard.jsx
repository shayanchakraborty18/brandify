import React from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "./AddToCart";
import { StarRating } from "../common/StarRating";

export const ProductCard = ({ product }) => {
  // console.log(product.images?.[0]?.url)
  // console.log(product.images[0])
  // console.log(product)

  // const {id, name, new_price, old_price, image} = product
  return (
    <div className="productCard rounded-md shadow-md p-4 relative group">
      <Link to={`/product/${product._id}`}>
        <div className="flex justify-center">
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={`http://localhost:3000/${product.images?.[0]?.url}`}
            alt=""
          />
        </div>
        <h4 className="text-text font-medium my-2 text-center">
          {product.name}
        </h4>
      </Link>
      <div className="flex justify-center mb-2">
        <StarRating rating={product.rating} hidetext={true} />
      </div>

      <div className="flex justify-center gap-2 mb-2">
        <p className="text-primary font-bold">${product.price}</p>
        {/* <p className="line-through text-text/50">${product.old_price}</p> */}
      </div>
      <div className="flex justify-center gap-2">
        <AddToCart product={product} />
        {/* <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button> */}
        {/* <button className="btn btn-outline-primary">View</button> */}
      </div>
    </div>
  );
};
