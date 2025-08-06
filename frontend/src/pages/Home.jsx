import React, { useEffect, useState } from "react";
import { HeroBanner } from "../components/banner/HeroBanner";
import { ProductGrid } from "../components/product/ProductGrid";
import { useShop } from "../context/ShopContext";
import { ProductCarousel } from "../components/product/ProductCarousel";
import { CategoryCarousel } from "../components/product/CategoryCarousel";

const Home = () => {
  const { getAllCategorys, loading, bestSelling, getFeaturedProducts } = useShop();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);


  useEffect(() => {
    getFeaturedProducts().then((data) => {
      setFeaturedProducts(data);
    });
    getAllCategorys().then((data) => {
      setCategorys(data);
    });
  }, []);

  // console.log(featuredProducts);
  console.log(categorys);

  return (
    <>
      <HeroBanner />

      {/* <ProductGrid gridTitle='new arrivals' productlList={products} /> */}
      <div className="container mx-auto px-4">
        <div className="section-gap">
          <CategoryCarousel categorylList={categorys} title={'Categories'} maxItem={7} />
          <ProductGrid
          gridTitle="Best Selling Products"
          productlList={bestSelling}
        />
        <ProductCarousel productlList={featuredProducts} title={'Featured Products'} />
        </div>
        

        
      </div>


    </>
  );
};

export default Home;
