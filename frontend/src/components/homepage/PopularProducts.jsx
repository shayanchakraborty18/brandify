import React from "react";
import { data_product } from "../../data/popular";
import { ProductItem } from "../productitem/ProductItem";

export const PopularProducts = () => {
  return (
    <div className="container mx-auto px-4 section-gap">
      <div className="text-center">
        <h2 className="text-2xl font-semibold uppercase">Popular Products</h2>
        <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {data_product.map((product) => (
          <ProductItem
            key={product.id}
                product={product}
          />
        ))}
      </div>
    </div>
  );
};
