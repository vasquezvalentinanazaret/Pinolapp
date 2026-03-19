"use client";

import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
  };
}
