import React from "react";
import { HeroBanner } from "../components/banner/HeroBanner";
import { ProductGrid } from "../components/product/ProductGrid";
import { useShop } from "../context/ShopContext";
import { ProductCarousel } from "../components/product/ProductCarousel";

const Home = () => {
  const { products, loading, bestSelling } = useShop();

  console.log(bestSelling);
  // console.log(products);

  return (
    <>
      <HeroBanner />

      {/* <ProductGrid gridTitle='new arrivals' productlList={products} /> */}
      <div className="container mx-auto px-4">
        <ProductGrid
          gridTitle="Best Selling Products"
          productlList={bestSelling}
        />

        <ProductCarousel productlList={bestSelling} title={'Product Carousel'} />
      </div>


    </>
  );
};

export default Home;
