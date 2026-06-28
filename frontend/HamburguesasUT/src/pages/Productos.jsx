import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function Productos() {
  return (
    <div className="productos-wrapper">
      <div className="hero-bg-wrapper">
        <Navbar />
        <section className="productos-card">
          <img
            src="src/HamburguesasUT.png"
            alt="HamburguesasUT Logo"
            className="productos-logo"
          />
          <h1 className="productos-title">Nuestros Productos</h1>
          <p className="productos-message">
            Descubre el menú completo de HamburguesasUT 🍔
          </p>
        </section>
      </div>
      <FooterBar />
    </div>
  );
}

export default Productos;
