// productService.js
import api from '../api/axios';

export const getAllProducts = (params) => api.get('/product/products?', { params });
export const getProductById = (id) => api.get(`/product/details/${id}`);
export const getBestSeller = (params) => api.get('/product/best-seller/?limit=4', { params });
export const getfeaturedProduct = (params) => api.get('/product/featured/', { params });
export const getProductCategory = (catname) => api.get(`/product/category/slug/${catname}`)
export const getSearchproduct = (keyword) => api.get(`/product/products?page=1&keyword=${keyword}`)
export const getAllCategory = () => api.get(`/product/categories`);
