import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ShopContextProvider } from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ShopContextProvider>
  </StrictMode>
);
