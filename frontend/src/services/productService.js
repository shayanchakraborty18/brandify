// productService.js
import api from '../api/axios';

export const getAllProducts = (params) => api.get('/product/products?page=1', { params });
export const getProductById = (id) => api.get(`/product/details/${id}`);
export const getBestSeller = (params) => api.get('/product/best-seller/?limit=4', { params });
export const getfeaturedProduct = (params) => api.get('/product/featured/?limit=1', { params });
export const getProductCategory = (catname) => api.get(`/product/products?page=1&category=${catname}`)
export const getSearchproduct = (keyword) => api.get(`/product/products?page=1&keyword=${keyword}`)
// export const getProductsByCategory = (slug) => api.get(`/products?category=${slug}`);
