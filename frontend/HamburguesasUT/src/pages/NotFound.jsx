import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function NotFound() {
  return (
    <div className="hero-bg-wrapper">

      <Navbar />

      <main className="notfound-container">

        <div className="notfound-card">

          <img
            src="src/HamburguesasUT.png"
            alt="HamburguesasUT"
            className="notfound-logo"
          />

          <span className="notfound-code">
            ERROR 404
          </span>

          <h1 className="notfound-title">
            Página no encontrada
          </h1>

          <p className="notfound-text">
            Lo sentimos, la página que intentas visitar no existe,
            fue movida o la dirección es incorrecta.
          </p>

          <div className="notfound-buttons">

            <Link
              to="/"
              className="notfound-btn primary"
            >
              🏠 Ir al inicio
            </Link>

            <button
              className="notfound-btn secondary"
              onClick={() => window.history.back()}
            >
              ← Regresar
            </button>

          </div>

        </div>

      </main>

      <FooterBar />

    </div>
  );
}

export default NotFound;