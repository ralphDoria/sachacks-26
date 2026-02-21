import { create } from "zustand"
import type { MenuItem } from "./data"

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  restaurantId: string
  restaurantName: string
}

interface CartState {
  items: CartItem[]
  restaurantId: string | null
  restaurantName: string | null
  restaurantSlug: string | null
  deliveryFee: number
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string, restaurantSlug: string, deliveryFee: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  restaurantId: null,
  restaurantName: null,
  restaurantSlug: null,
  deliveryFee: 0,

  addItem: (item, restaurantId, restaurantName, restaurantSlug, deliveryFee) => {
    const state = get()

    if (state.restaurantId && state.restaurantId !== restaurantId) {
      set({
        items: [{ menuItem: item, quantity: 1, restaurantId, restaurantName }],
        restaurantId,
        restaurantName,
        restaurantSlug,
        deliveryFee,
      })
      return
    }

    const existing = state.items.find((i) => i.menuItem.id === item.id)
    if (existing) {
      set({
        items: state.items.map((i) =>
          i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        restaurantId,
        restaurantName,
        restaurantSlug,
        deliveryFee,
      })
    } else {
      set({
        items: [...state.items, { menuItem: item, quantity: 1, restaurantId, restaurantName }],
        restaurantId,
        restaurantName,
        restaurantSlug,
        deliveryFee,
      })
    }
  },

  removeItem: (itemId) => {
    const state = get()
    const newItems = state.items.filter((i) => i.menuItem.id !== itemId)
    set({
      items: newItems,
      restaurantId: newItems.length > 0 ? state.restaurantId : null,
      restaurantName: newItems.length > 0 ? state.restaurantName : null,
      restaurantSlug: newItems.length > 0 ? state.restaurantSlug : null,
      deliveryFee: newItems.length > 0 ? state.deliveryFee : 0,
    })
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId)
      return
    }
    set({
      items: get().items.map((i) =>
        i.menuItem.id === itemId ? { ...i, quantity } : i
      ),
    })
  },

  clearCart: () => set({ items: [], restaurantId: null, restaurantName: null, restaurantSlug: null, deliveryFee: 0 }),

  getTotal: () =>
    get().items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0),

  getItemCount: () =>
    get().items.reduce((count, item) => count + item.quantity, 0),
}))
