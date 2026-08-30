import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MENU, type MenuItem } from "../data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

interface OrderState {
  cart: Record<string, number>;
  lines: CartLine[];
  count: number;
  total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  selected: MenuItem | null;
  setSelected: (item: MenuItem | null) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const OrderContext = createContext<OrderState | null>(null);
const STORAGE_KEY = "sian-kitchen-cart-v1";

function loadCart(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    // drop anything that no longer exists in the menu dataset
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, qty]) => MENU.some((m) => m.id === id) && qty > 0)
    );
  } catch {
    return {};
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>(loadCart);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* private mode — cart simply won't persist */
    }
  }, [cart]);

  const add = useCallback((id: string, qty = 1) => {
    setCart((prev) => ({ ...prev, [id]: Math.min(20, (prev[id] ?? 0) + qty) }));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(20, qty);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);

  const lines = useMemo<CartLine[]>(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const item = MENU.find((m) => m.id === id);
          return item ? { item, qty } : null;
        })
        .filter((l): l is CartLine => l !== null),
    [cart]
  );

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const total = useMemo(() => lines.reduce((s, l) => s + l.item.price * l.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      cart,
      lines,
      count,
      total,
      add,
      setQty,
      remove,
      clear,
      selected,
      setSelected,
      drawerOpen,
      setDrawerOpen,
    }),
    [cart, lines, count, total, add, setQty, remove, clear, selected, drawerOpen]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderState {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
