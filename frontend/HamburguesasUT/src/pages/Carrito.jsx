import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { useCart } from "../context/CartContext";
import apiCheckout from "../api/apiCheckout";

function Carrito() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, iva, descuento, total, totalItems } = useCart();

  const [checkingOut, setCheckingOut] = useState(false);
  const [pasoActual, setPasoActual] = useState("");
  const [errorCheckout, setErrorCheckout] = useState("");
  const [ticket, setTicket] = useState(null);
  const [ticketProductNames, setTicketProductNames] = useState({});

  const formatearMoneda = (valor) => {
    return `$${valor.toFixed(2)}`;
  };

  const pasos = [
    { id: "Validar conexión", label: "Validar conexión" },
    { id: "Validar inventario", label: "Validar inventario" },
    { id: "Calcular total", label: "Calcular total" },
    { id: "Enviar pedido", label: "Enviar pedido" },
    { id: "Guardar compra", label: "Guardar compra" },
    { id: "Mostrar Ticket", label: "Mostrar Ticket" }
  ];

  const finalizarCompra = async () => {
    setCheckingOut(true);
    setErrorCheckout("");
    setTicket(null);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setErrorCheckout("Debes iniciar sesión para finalizar la compra");
      setCheckingOut(false);
      return;
    }

    const products = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }));

    try {
      // PASO 1: Validar conexión
      setPasoActual("Validar conexión");
      await new Promise((r) => setTimeout(r, 400));

      // PASO 2: Validar inventario
      setPasoActual("Validar inventario");
      await new Promise((r) => setTimeout(r, 400));

      // PASO 3: Calcular total
      setPasoActual("Calcular total");
      await new Promise((r) => setTimeout(r, 400));

      // PASO 4-6: Enviar pedido, Guardar compra, Mostrar Ticket
      setPasoActual("Enviar pedido");
      const response = await apiCheckout.post("/checkout", {
        userId: user.id || 1,
        products,
        subtotal,
        iva,
        descuento,
        total
      });

      setPasoActual("Guardar compra");
      await new Promise((r) => setTimeout(r, 300));

      setPasoActual("Mostrar Ticket");
      await new Promise((r) => setTimeout(r, 300));

      // Guardar nombres de productos antes de limpiar el carrito
      const namesMap = {};
      items.forEach(item => {
        namesMap[item.id] = item.name;
      });
      setTicketProductNames(namesMap);

      setTicket(response.data.ticket);
      clearCart();
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        if (errorData.errores) {
          setErrorCheckout(errorData.errores.join("\n"));
        } else {
          setErrorCheckout(errorData.error || "Error en el checkout");
        }
      } else {
        setErrorCheckout("Error de conexión con el servidor");
      }
    } finally {
      setCheckingOut(false);
      setPasoActual("");
    }
  };

  const cerrarTicket = () => {
    setTicket(null);
  };

  return (
    <div className="hero-bg-wrapper">
      <Navbar />
      <section className="carrito-card">
        <img
          src="src/HamburguesasUT.png"
          alt="HamburguesasUT Logo"
          className="carrito-logo"
        />
        <h1 className="carrito-title">Tu Carrito</h1>

        {items.length === 0 && !ticket ? (
          <div className="carrito-vacio">
            <p className="carrito-message">
              Tu carrito está vacío 🛒
            </p>
            <p className="carrito-submessage">
              Agrega productos desde nuestro menú
            </p>
            <Link to="/menu" className="carrito-ir-menu-btn">
              Ir al menú
            </Link>
          </div>
        ) : (
          <>
            {!ticket && (
              <>
                <p className="carrito-items-count">
                  {totalItems} {totalItems === 1 ? "producto" : "productos"} en tu carrito
                </p>

                <div className="carrito-lista">
                  {items.map((item) => (
                    <div key={item.id} className="carrito-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="carrito-item-img"
                      />
                      <div className="carrito-item-info">
                        <h3 className="carrito-item-name">{item.name}</h3>
                        <p className="carrito-item-price">
                          {formatearMoneda(item.price)} c/u
                        </p>
                        <p className="carrito-item-subtotal">
                          Subtotal: {formatearMoneda(item.price * item.quantity)}
                        </p>
                      </div>
                      <div className="carrito-item-actions">
                        <div className="cart-controls">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="carrito-item-remove"
                          onClick={() => removeItem(item.id)}
                          title="Eliminar producto"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="carrito-resumen">
                  <h2 className="carrito-resumen-title">Resumen</h2>
                  <div className="carrito-resumen-row">
                    <span>Subtotal</span>
                    <span>{formatearMoneda(subtotal)}</span>
                  </div>
                  <div className="carrito-resumen-row">
                    <span>IVA (16%)</span>
                    <span>{formatearMoneda(iva)}</span>
                  </div>
                  <div className="carrito-resumen-row">
                    <span>Descuento</span>
                    <span>{formatearMoneda(descuento)}</span>
                  </div>
                  <div className="carrito-resumen-row carrito-resumen-total">
                    <span>Total</span>
                    <span>{formatearMoneda(total)}</span>
                  </div>
                </div>

                <div className="carrito-actions">
                  <button
                    className="carrito-checkout-btn"
                    onClick={finalizarCompra}
                    disabled={checkingOut}
                  >
                    {checkingOut ? "Procesando..." : "Finalizar Compra"}
                  </button>
                  <button className="carrito-vaciar-btn" onClick={clearCart} disabled={checkingOut}>
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}

            {/* Modal de progreso */}
            {checkingOut && (
              <div className="checkout-modal-overlay">
                <div className="checkout-modal">
                  <h2 className="checkout-modal-title">Procesando compra</h2>
                  <div className="checkout-pasos">
                    {pasos.map((paso) => (
                      <div
                        key={paso.id}
                        className={`checkout-paso ${
                          pasos.findIndex((p) => p.id === pasoActual) >=
                          pasos.findIndex((p) => p.id === paso.id)
                            ? pasoActual === paso.id
                              ? "checkout-paso-activo"
                              : "checkout-paso-completado"
                            : ""
                        }`}
                      >
                        <span className="checkout-paso-icono">
                          {pasos.findIndex((p) => p.id === pasoActual) >
                          pasos.findIndex((p) => p.id === paso.id) ? (
                            "✅"
                          ) : pasoActual === paso.id ? (
                            <span className="checkout-spinner"></span>
                          ) : (
                            "⏳"
                          )}
                        </span>
                        <span className="checkout-paso-label">{paso.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {errorCheckout && (
              <div className="checkout-error">
                <p className="checkout-error-title">❌ Error</p>
                <pre className="checkout-error-text">{errorCheckout}</pre>
                <button
                  className="carrito-ir-menu-btn"
                  onClick={() => setErrorCheckout("")}
                >
                  Cerrar
                </button>
              </div>
            )}

            {/* Ticket */}
            {ticket && (
              <div className="checkout-modal-overlay">
                <div className="checkout-modal ticket-modal">
                  <h2 className="checkout-modal-title">🧾 Ticket de Compra</h2>
                  <div className="ticket-info">
                    <div className="ticket-row">
                      <span>Folio:</span>
                      <span>#{ticket.cartId}</span>
                    </div>
                    <div className="ticket-row">
                      <span>Fecha:</span>
                      <span>{new Date(ticket.date).toLocaleString("es-MX")}</span>
                    </div>
                    <div className="ticket-divider"></div>
                    <div className="ticket-productos">
                      {ticket.products.map((p, i) => (
                        <div key={i} className="ticket-producto-row">
                          <span>{ticketProductNames[p.productId] || `Producto #${p.productId}`}</span>
                          <span>x{p.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="ticket-divider"></div>
                    <div className="ticket-row">
                      <span>Subtotal</span>
                      <span>{formatearMoneda(ticket.subtotal)}</span>
                    </div>
                    <div className="ticket-row">
                      <span>IVA (16%)</span>
                      <span>{formatearMoneda(ticket.iva)}</span>
                    </div>
                    <div className="ticket-row">
                      <span>Descuento</span>
                      <span>{formatearMoneda(ticket.descuento)}</span>
                    </div>
                    <div className="ticket-divider"></div>
                    <div className="ticket-row ticket-total">
                      <span>Total</span>
                      <span>{formatearMoneda(ticket.total)}</span>
                    </div>
                  </div>
                  <button className="carrito-checkout-btn" onClick={cerrarTicket}>
                    Cerrar ticket
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      <FooterBar />
    </div>
  );
}

export default Carrito;