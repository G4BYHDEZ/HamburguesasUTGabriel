import { Link } from "react-router-dom";

function NotFound() {
  return (

      <div className="hero-bg-wrapper">
   

        <section className="hero-bg notfound-section">
          <div className="hero-bg-container">
            <img
              src="/HamburguesasUT.png"
              alt="HamburguesasUT Logo"
              className="hero-bg-logo"
            />

            <div className="notfound-content">
              <h1>404</h1>
              <h2>Página no encontrada</h2>
              <p>
                La página que intentas visitar no existe o fue movida.
              </p>

            </div>
          </div>
        </section>
      </div>

  );
}

export default NotFound;