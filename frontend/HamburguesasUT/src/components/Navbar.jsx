import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const links = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Menú", ruta: "/menu" },
    { nombre: "Carrito", ruta: "/carrito", badge: totalItems },
    user
      ? { nombre: "Mi Perfil", ruta: "/perfil" }
      : { nombre: "Login", ruta: "/login" }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-content">
        <Link to="/">
          <img
            src="src/HamburguesasUT.png"
            alt="HamburguesasUT Logo"
            className="navbar-logo"
          />
        </Link>

        <nav className="navbar">
          <ul className="navbar-links">
            {links.map((link) => (
              <li
                key={link.nombre}
                className={
                  location.pathname === link.ruta
                    ? "navbar-item active-link"
                    : "navbar-item"
                }
              >
                <Link to={link.ruta} className="navbar-link">
                  {link.nombre}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="navbar-badge">{link.badge}</span>
                  )}
                </Link>
              </li>
            ))}

            {user && (
              <li className="navbar-item">
                <button
                  type="button"
                  className="navbar-link navbar-logout-btn"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;