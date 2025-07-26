import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { StarRating } from "../components/common/StarRating";

export default function Products() {
  const { getCategory } = useShop();
  const { catname } = useParams();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialPrice, setInitialPrice] = useState({ min: 0, max: 0 });
  const [maxPrice, setMaxPrice] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const matchCategory = async () => {
      setLoading(true);
      const matchdata = await getCategory(catname);
      setCategory(matchdata);
      const prices = matchdata.map((item) => item.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setInitialPrice({ min, max });
      setLoading(false);
    };

    matchCategory();
  }, [catname]);

  useEffect(() => {
    setMaxPrice(initialPrice.max);
  }, [initialPrice.max]);

  const filterProducts = category.filter(
    (item) => item.price <= maxPrice && item.rating >= rating
  );
  console.log(rating);
  if (loading) return <p>Loading...</p>;
  if (category.length === 0) return <p>No matching category found</p>;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="section-gap">

      
      <div className="text-center">
        <h2 className="text-2xl font-semibold uppercase">{catname}</h2>
        <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded"></div>
      </div>
      <div className="flex gap-8">
        <div className="w-64">
          <div className="price-slider p-4 border rounded w-full">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <input
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              type="range"
              min={initialPrice.min}
              max={initialPrice.max}
              value={maxPrice}
              step="250"
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>₹{initialPrice.min}</span>
              <span>₹{maxPrice}</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between gap-2 items-center">
              <h3 className="font-semibold">Customer Ratings</h3>
              {rating >= 4 && (
                <div onClick={()=> setRating(0)} className="text-sm cursor-pointer">
                  ✕<span> Clear</span>
                </div>
              )}
            </div>

            <div className="cursor-pointer" onClick={() => setRating(4)}>
              <StarRating rating={4} info={"& Above"} />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <ProductGrid productlList={filterProducts} />
        </div>
      </div>
      </div>
    </div>
  );
}
