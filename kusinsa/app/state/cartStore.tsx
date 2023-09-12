import { create } from 'zustand';
import { Product } from '../api/api';

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
  total: number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  total: 0,
  addProduct: (product: Product) =>
    set((state) => {
      const productIndex = state.products.find(
        (item) => item.id === product.id
      );
      state.total += +product.product_price;
      if (productIndex) {
        return {
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          products: [...state.products, { ...product, quantity: 1 }],
        };
      }
    }),
  removeProduct: (product: Product) =>
    set((state) => {
      const productIndex = state.products.find(
        (item) => item.id === product.id
      );
      state.total -= product.product_price;
      if (productIndex) {
        return {
          products: state.products
            .map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        };
      }
    }),
  clearCart: () =>
    set((state) => {
      state.total = 0;
      return {
        products: [],
      };
    }),
}));

export default useCartStore;
