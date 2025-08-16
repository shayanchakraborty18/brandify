import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/account/Dashboard";
import OrderHistory from "../pages/account/OrderHistory";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import { AllProducts } from "../pages/AllProducts";


// Exporting route config as arrays
export const publicRoutes = [
  { path: "/", element: <Home /> },
  {path: "/products/", element: <AllProducts/>},
  {path: "/products/:catname", element: <Products/>},
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/cart", element: <Cart/> },
];

export const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export const privateRoutes = [
  { path: "/account", element: <Dashboard /> }, // `/account`
  { path: "/account/orders", element: <OrderHistory /> }, // `/account/orders`
  // { path: "/checkout", element: <Checkout /> }
  
];
