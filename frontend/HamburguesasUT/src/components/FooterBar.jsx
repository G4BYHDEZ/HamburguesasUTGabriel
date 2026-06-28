import { FaClock, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

function FooterBar() {
  return (
    <footer className="footer-container">
      <div className="footer-top">

        {/* HORARIO */}
        <div className="footer-item">
          <FaClock className="footer-icon" />
          <div>
            <h4 className="footer-title">HORARIO</h4>
            <p className="footer-text">1:00 p.m. - 8:00 p.m.</p>
          </div>
        </div>

        {/* TELÉFONO */}
        <div className="footer-item">
          <FaPhone className="footer-icon" />
          <div>
            <h4 className="footer-title">TELÉFONOS</h4>

          <a
            href="tel:+526535185146"
            className="footer-link"
          >
            +52 653 518 5146
          </a>
          </div>
        </div>

      </div>

      {/* MAPA */}
      <div className="footer-map">
        <iframe
          title="Mapa HamburguesasUT"
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: "8px" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=32.43808661574545,-114.71682816419917&z=18&output=embed"
        />

        <p className="footer-address">
          📍 Av. Jalisco, 83457 San Luis Río Colorado, Son.
        </p>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <Link to="/">
          <img
            src="src/HamburguesasUT.png"
            alt="HamburguesasUT Logo"
            className="navbar-logo"
          />
        </Link>

        <p className="footer-copy">
          © {new Date().getFullYear()} HamburguesasUT. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default FooterBar;