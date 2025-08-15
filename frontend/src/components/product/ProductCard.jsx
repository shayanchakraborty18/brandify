import React from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "./AddToCart";
import { StarRating } from "../common/StarRating";
import { IMAGE_PATH } from "../../utils/constants";

export const ProductCard = ({ product }) => {
  // console.log(product.images?.[0]?.url)
  // console.log(product.images[0])
  // console.log(product)

  // const {id, name, new_price, old_price, image} = product
  return (
    <div className="productCard rounded-md shadow-md p-4 relative group bg-card">
      <Link to={`/product/${product._id}`}>
        <div className="flex justify-center relative rounded-lg bg-background">
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={`${IMAGE_PATH}/${product.images?.[0]?.url}`}
            alt=""
            className="rounded-lg"
          />
          {product.on_sale && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 uppercase rounded-bl-lg text-xs">
              On Sale
            </div>
          )}
          {product.new_arrival && (
            <div className="absolute top-0 left-0 bg-primary text-white px-2 py-1 uppercase rounded-br-lg text-xs">
              New Arrival
            </div>
          )}
        </div>
        <h4 className="text-text font-medium my-2 text-center">
          {product.name}
        </h4>
      </Link>
      <div className="flex justify-center mb-2">
        <StarRating rating={product.rating} hidetext={true} />
      </div>

      <div className="flex justify-center gap-2 mb-2">
        <p className="text-primary font-bold">₹{product.price}</p>
        {/* <p className="line-through text-text/50">${product.old_price}</p> */}
        {product.discount_price && (
          <p className="line-through text-text/50">₹{product.discount_price}</p>
        )}
      </div>
      <div className="flex justify-center gap-2">
        <AddToCart product={product} />
        {/* <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button> */}
        {/* <button className="btn btn-outline-primary">View</button> */}
      </div>
    </div>
  );
};
