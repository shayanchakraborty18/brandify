import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/product/ProductCard";
import { ProductGrid } from "../components/product/ProductGrid";

export default function Products() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCategory } = useShop();
  const { catname } = useParams();

  useEffect(() => {
    const matchCategory = async () => {
      setLoading(true);
      const matchdata = await getCategory(catname);
      setCategory(matchdata);
      setLoading(false);
    };

    matchCategory();
  }, [catname]);

  // console.log(category);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (category.length === 0) {
    return <p>No matching category found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <ProductGrid productlList={category} gridTitle={catname} />
    </div>
  );
}
