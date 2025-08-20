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
import { OrderDetails } from "../pages/account/OrderDetails";
import { Contact } from "../pages/contact";


// Exporting route config as arrays
export const publicRoutes = [
  { path: "/", element: <Home /> },
  {path: "/products/", element: <AllProducts/>},
  {path: "/products/:catname", element: <Products/>},
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/cart", element: <Cart/> },
  { path: "/contact", element: <Contact/> },
];

export const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export const privateRoutes = [
  { path: "/account", element: <Dashboard /> }, 
  { path: "/account/orders", element: <OrderHistory /> }, 
  { path: "/account/order/:id", element: <OrderDetails /> }
  // { path: "/checkout", element: <Checkout /> }
  
];
