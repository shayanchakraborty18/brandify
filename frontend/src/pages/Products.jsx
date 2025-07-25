import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/product/ProductCard";
import { ProductGrid } from "../components/product/ProductGrid";

export default function Products() {
  const { getCategory } = useShop();
  const { catname } = useParams();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [initialPrice, setInitialPrice] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const matchCategory = async () => {
      setLoading(true);
      const matchdata = await getCategory(catname);
      setCategory(matchdata);
      const min = Math.min(...matchdata.map((item) => item.price));
      const max = Math.max(...matchdata.map((item) => item.price));
      setInitialPrice({...initialPrice, min, max});
      setLoading(false);
    };

    matchCategory();
  }, [catname]);

  const filterProducts = category.filter((item) => item.price <= maxPrice);
  console.log(maxPrice);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (category.length === 0) {
    return <p>No matching category found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex">
        <div className="w-2xs">
          <div className="price-slider p-4 border rounded max-w-sm w-full">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <input
              onChange={(e) => setMaxPrice(e.target.value)}
              type="range"
              min={initialPrice.min}
              max={initialPrice.max}
              step="250"
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>₹{initialPrice.min}</span>
              <span>₹{initialPrice.max}</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <ProductGrid productlList={filterProducts} />
        </div>
      </div>
    </div>
  );
}
