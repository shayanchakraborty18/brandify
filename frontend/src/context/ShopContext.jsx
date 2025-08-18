import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllCategory,
  getmyOrders,
  getAllProducts,
  getBestSeller,
  getfeaturedProduct,
  getProductById,
  getProductCategory,
  getSearchproduct,
  getOrderById,
} from "../services/productService";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  // const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);

  const [loading, setLoading] = useState(false);

  const bestSellerProducts = async () => {
    setLoading(true);
    try {
      const res = await getBestSeller();
      setBestSelling(res.data.products);
      //   console.log(res.data.products.data)
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      // setProducts(res.data.products.data);
      return res.data.products.data
      //   console.log(res.data.products.data)
    } catch (err) {
      console.error("Error fetching products:", err);
      return null
    } 
  };

  const getProductDetail = async (id) => {
    try {
      const res = await getProductById(id);
      if (!res.data.productDetails) throw new Error("Product not found");
      return res.data.productDetails;
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  };

  const getCategory = async (catname) => {
    try {
      const res = await getProductCategory(catname);
      return res.data.products;
      // return res
    } catch (err) {
      console.error("Error getting category:", err);
      return null;
    }
  };

  const getAllCategorys = async () => {
    try {
      const res = await getAllCategory();
      return res.data.categories.data;
      // return res
    } catch (err) {
      console.error("Error getting category:", err);
      return null;
    }
  };


  const getSearchproducts = async (keyword) => {
    try {
      const res = await getSearchproduct(keyword);
      return res.data.products.data;
    } catch (err) {
      console.error("Error getting in product search", err);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      const res = await getfeaturedProduct();
      return res.data.products;
    } catch (err) {
      console.error("Error getting featured products", err);
    }
  };

  const getMyOrders = async () => {
    try {
      const res = await getmyOrders();
      return res.data.orders;
    } catch (err) {
      console.error("Error getting all orders", err);
    }
  };

  const getOrderDetails = async (id) => {
    try {
      const res = await getOrderById(id);
      return res.data.order

    } catch(err){
      console.error("Error getting order details", err);
    }
  }

  useEffect(() => {
    bestSellerProducts();
    fetchAllProducts();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        fetchAllProducts,
        loading,
        bestSelling,
        getProductDetail,
        getCategory,
        getSearchproducts,
        getFeaturedProducts,
        getAllCategorys,
        getMyOrders,
        getOrderDetails
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
