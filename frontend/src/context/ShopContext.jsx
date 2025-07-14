import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts, getBestSeller } from "../services/productService";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data.products.data);
    //   console.log(res.data.products.data)
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const bestSellerProducts = async () => {
    setLoading(true);
    try {
      const res = await getBestSeller();
      setBestSelling(res.data.products.data);
    //   console.log(res.data.products.data)
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    bestSellerProducts();
  }, []);

  return (
    <ShopContext.Provider value={{ products, loading, bestSelling }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
