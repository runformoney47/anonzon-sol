import { create } from 'zustand';
import { CartItem, Product } from '@/types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (amazonUrl: string) => void;
  updateQuantity: (amazonUrl: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.amazonUrl === product.amazonUrl);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.amazonUrl === product.amazonUrl
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        items: [...state.items, { ...product, quantity: 1 }]
      };
    });
  },
  
  removeItem: (amazonUrl: string) => {
    set((state) => ({
      items: state.items.filter(item => item.amazonUrl !== amazonUrl)
    }));
  },
  
  updateQuantity: (amazonUrl: string, quantity: number) => {
    set((state) => ({
      items: state.items.map(item =>
        item.amazonUrl === amazonUrl
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  total: () => {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
})); 