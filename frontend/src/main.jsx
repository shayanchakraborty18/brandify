import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ShopContextProvider } from "./context/ShopContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </ShopContextProvider>
  </StrictMode>
);
