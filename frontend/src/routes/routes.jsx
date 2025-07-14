import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/account/Dashboard";
import OrderHistory from "../pages/account/OrderHistory";

// Exporting route config as arrays
export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/product/:id", element: <ProductDetail /> },
];

export const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export const privateRoutes = [
  { path: "", element: <Dashboard /> }, // `/account`
  { path: "orders", element: <OrderHistory /> }, // `/account/orders`
];
