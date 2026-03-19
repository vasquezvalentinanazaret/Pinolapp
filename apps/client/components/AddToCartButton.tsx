"use client";

import { useCart } from "../hooks/useCart";

export default function AddToCartButton() {
  const { addItem } = useCart();

  return (
    <button
      onClick={() =>
        addItem({
          id: 1,
          name: "Producto Demo",
          price: 10,
        })
      }
      className="bg-blue-500 text-white p-2 rounded"
    >
      Agregar Producto Demo
    </button>
  );
}
