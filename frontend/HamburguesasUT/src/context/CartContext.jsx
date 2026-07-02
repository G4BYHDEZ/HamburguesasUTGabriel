import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cargar carrito desde localStorage al iniciar
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notificación temporal
  const [notification, setNotification] = useState(null);
  const notifTimeout = useRef(null);

  const showNotification = useCallback((message) => {
    if (notifTimeout.current) clearTimeout(notifTimeout.current);
    setNotification(message);
    notifTimeout.current = setTimeout(() => {
      setNotification(null);
      notifTimeout.current = null;
    }, 2000);
  }, []);

  // Persistir en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ACCIONES
  const addItem = useCallback((product) => {
    setItems((prev) => {
      const id = product.id || product._id || product.name;
      const existente = prev.find((item) => item.id === id);

      if (existente) {
        if (existente.quantity >= product.stock) return prev;
        showNotification(`+1 ${product.name}`);
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      showNotification(`¡${product.name} agregado!`);
      return [
        ...prev,
        {
          id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: 1,
        },
      ];
    });
  }, [showNotification]);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) => {
        if (item.id !== id) return item;
        const clamped = Math.min(quantity, item.stock);
        return { ...item, quantity: clamped };
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // VALORES DERIVADOS (automáticos)
  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const iva = useMemo(() => subtotal * 0.16, [subtotal]);
  const descuento = useMemo(() => 0, []); // placeholder, listo para futuro
  const total = useMemo(() => subtotal + iva - descuento, [subtotal, iva, descuento]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      iva,
      descuento,
      total,
      totalItems,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, subtotal, iva, descuento, total, totalItems]
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Toast de notificación */}
      {notification && (
        <div className="cart-toast">
          <span className="cart-toast-icon">✅</span>
          <span className="cart-toast-text">{notification}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}

export default CartContext;