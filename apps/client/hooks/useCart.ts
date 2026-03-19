export type CartItem = {
  id: number;
  name: string;
  price: number;
};

export function useCart() {
  const addItem = (item: CartItem) => {
    console.log("Producto agregado:", item);
  };

  return { addItem };
}
