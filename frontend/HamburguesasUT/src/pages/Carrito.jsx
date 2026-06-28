import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function Carrito() {
  return (
    <div className="carrito-wrapper">
      <div className="hero-bg-wrapper">
        <Navbar />
        <section className="carrito-card">
          <img
            src="src/HamburguesasUT.png"
            alt="HamburguesasUT Logo"
            className="carrito-logo"
          />
          <h1 className="carrito-title">Tu Carrito</h1>
          <p className="carrito-message">
            Aquí verás tus pedidos listos para disfrutar 🍔
          </p>
        </section>
      </div>
      <FooterBar />
    </div>
  );
}

export default Carrito;
