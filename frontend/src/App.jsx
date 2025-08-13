// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { publicRoutes, authRoutes, privateRoutes } from "./routes/routes";

export default function App() {
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
