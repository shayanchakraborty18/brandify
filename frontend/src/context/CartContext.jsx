import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    setCartItem((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItem((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItem([]);
    sessionStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
