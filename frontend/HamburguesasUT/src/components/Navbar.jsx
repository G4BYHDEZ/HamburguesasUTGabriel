import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const links = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Menú", ruta: "/menu" },
    { nombre: "Carrito", ruta: "/carrito" },
    usuario
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
                <Link
                  to={link.ruta}
                  className="navbar-link"
                >
                  {link.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;