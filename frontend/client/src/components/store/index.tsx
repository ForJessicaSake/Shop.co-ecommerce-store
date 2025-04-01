import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "../../lib/types";

interface ProductStoreState {
  cartCount: number;
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  updateCart: (product: ProductType, quantity: number) => void;
}

export const useCartStore = create<ProductStoreState>()(
  persist(
    (set) => ({
      cartCount: 0,
      cart: [] as ProductType[],
      addToCart: (product: ProductType) => {
        set((state: ProductStoreState) => ({
          cartCount: state.cartCount + 1,
          cart: [...state.cart, product],
        }));
      },
      removeFromCart: (product: ProductType) => {
        set((state: ProductStoreState) => ({
          cartCount: state.cartCount - 1,
          cart: state.cart.filter((item) => item._id !== product._id),
        }));
      },
      updateCart: (product: ProductType, quantity: number) => {
        set((state: ProductStoreState) => {
          if (quantity === 0) {
            return {
              cartCount: state.cartCount - 1,
              cart: state.cart.filter((item) => item._id !== product._id),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item._id === product._id ? { ...item, quantity } : item
            ),
          };
        });
      },
    }),
    { name: "cart-storage" }
  )
);
