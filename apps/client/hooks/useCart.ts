"use client";

import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
  };
}
