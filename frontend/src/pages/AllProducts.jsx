import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { ProductGrid } from "../components/product/ProductGrid";
import { StarRating } from "../components/common/StarRating";
import { ProductCardSkeleton } from "../components/product/ProductCardSkeleton";

export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { fetchAllProducts } = useShop();
  const [initialPrice, setInitialPrice] = useState({ min: 0, max: 0 });
  const [maxPrice, setMaxPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
      const prices = allProducts.map((item) => item.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setInitialPrice({ min, max });
      setLoading(false);
    };

    getAllProducts();
  }, [products]);

  useEffect(() => {
    if (initialPrice.max > 0) {
      setMaxPrice(initialPrice.max);
    }
  }, [initialPrice.max]);

  const filterProducts = products.filter(
    (item) => item.price <= maxPrice && item.rating >= rating
  );

  const items = filterProducts.length;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  console.log(products);
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="section-gap">
        <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_3fr] gap-6 relative group">
          <div className="text-left">
            <h2 className="text-2xl font-semibold uppercase">All Products</h2>
            {/* <div className="mt-2 w-20 h-1 bg-primary mx-left rounded"></div> */}
            <p>{items} Items</p>
          </div>

          <div className="flex justify-end gap-4 grid-cols-3">
            <div className="price-slider p-2 rounded border border-text/20 bg-background">
              <div className="flex justify-between text-sm gap-4 mb-1">
                <span>₹{initialPrice.min}</span>
                <h3 className="font-semibold text-text/50 uppercase">
                  Max Price
                </h3>

                <span>₹{maxPrice}</span>
              </div>
              <input
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                type="range"
                min={initialPrice.min}
                max={initialPrice.max}
                value={maxPrice}
                className="w-full accent-primary"
              />
            </div>
            <div className="price-slider p-2 rounded border border-text/20 bg-background">
              <div className="flex justify-between text-sm gap-4">
                <h3 className="font-semibold text-text/50 uppercase">
                  By Ratings
                </h3>
                {rating >= 4 && (
                  <div
                    onClick={() => setRating(0)}
                    className="text-sm cursor-pointer"
                  >
                    ✕<span> Clear</span>
                  </div>
                )}
              </div>

              <div className="cursor-pointer" onClick={() => setRating(4)}>
                <StarRating rating={4} info={"& Above"} />
              </div>
            </div>
          </div>
        </div>
        <ProductGrid productlList={filterProducts} />
      </div>
    </div>
  );
};
