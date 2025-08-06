import React from "react";
import { StarRating } from "../common/StarRating";

export const ProductDetailsInfo = ({ product }) => {
  const discountPercent = Math.round(
    ((product.discount_price - product.price) / product.discount_price) * 100
  );

  return (
    <div className="product-details-info flex flex-col gap-4 py-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <StarRating rating={product.rating} />
      <p>InStock : {product.stock}</p>
      <div className="flex flex-col">
<div className="flex gap-2">
        <p className="text-lg font-semibold">₹{product.price}</p>
        {discountPercent > 0 && (
          <p className="text-red-500">{discountPercent}% OFF</p>
        )}
      </div>

      {product.discount_price && (
        <p className="line-through text-sm text-text/50">
          ₹{product.discount_price}
        </p>
      )}
      </div>
      
    </div>
  );
};
