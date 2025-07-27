import React, { useEffect, useState } from "react";
import { useShop } from "../../context/ShopContext";
import { ProductGrid } from "./ProductGrid";
import { ProductCarousel } from "./ProductCarousel";

export const Relatedproducts = ({ currentProduct }) => {
  const productCat = currentProduct.category;
  const currentproductid = currentProduct._id;
  const [products, setProducts] = useState([]);
  const { getCategory } = useShop();

  useEffect(() => {
    const getRelProducts = async () => {
      const matchdata = await getCategory(productCat);
      const firstfour = matchdata
        .filter((item) => item._id !== currentproductid)
        .slice(0, 8);
      setProducts(firstfour);
    };
    getRelProducts();
  }, [currentProduct]);

  // console.log(products)

  return (
    <ProductCarousel productlList={products} title={'You May Also Like'}/>
    // <ProductGrid productlList={products} gridTitle={"You May Alos Like"} />
  );
};
