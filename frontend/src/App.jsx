// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { publicRoutes, authRoutes, privateRoutes } from "./routes/routes";

// Payment
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from '@stripe/react-stripe-js';
import api from "./api/axios";
import { useEffect, useState } from "react";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

export default function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {

    async function getStripApiKey() {
      const data = await api.get('/order/payment/apikey')
      
      setStripeApiKey(data.data.stripeApiKey);
    }
    // console.log("Fetching Stripe API Key- ", stripeApiKey);

    getStripApiKey();

  }, [])

  

  return (
    <Router>
      <Routes>
        {/* Public site pages */}
        <Route element={<SiteLayout />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {/* Protected account section */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            
            {privateRoutes.map(({ path, element }) => (
              <Route key={path || "index"} index={!path} path={path} element={element} />
            ))}
          </Route>
          <Route path="/checkout" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              </Elements>
            } />
          <Route path="/success" element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } />
        </Route>

        {/* Auth pages */}
        <Route element={<SiteLayout />}>
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
