import React from 'react'
import { HeroBanner } from '../components/banner/HeroBanner'
import { ProductGrid } from '../components/product/ProductGrid'
import { useShop } from '../context/ShopContext'

const Home = () => {
  const {products, loading, bestSelling} = useShop()
  return (
    <>
      <HeroBanner/>

      <ProductGrid gridTitle='new arrivals' productlList={products} />
      <ProductGrid gridTitle='Best Selling Products' productlList={bestSelling} />
    </>
  )
}

export default Home