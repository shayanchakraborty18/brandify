import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import SiteLayout from './layouts/SiteLayout';
// import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/account/Dashboard';
import OrderHistory from './pages/account/OrderHistory';

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes with Public Layout */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

{/* Public Routes with Public Layout */}
        <Route element={<AuthLayout />}>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Route>

        {/* Protected Routes with Dashboard Layout */}
        <Route
          path="/account"
          element={
            // <PrivateRoute>
              <DashboardLayout />
            // </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrderHistory />} />
        </Route>

      </Routes>
    </Router>
  );
}
