// productService.js
import api from '../api/axios';

export const getAllProducts = (params) => api.get('/product/products?page=1', { params });
export const getProductById = (id) => api.get(`/product/details/${id}`);
export const getBestSeller = (params) => api.get('/product/best-seller/?limit=5', { params });
// export const getProductsByCategory = (slug) => api.get(`/products?category=${slug}`);
