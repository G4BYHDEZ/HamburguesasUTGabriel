import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function Home() {
  const navigate = useNavigate();
  const carruselRef = useRef(null);

  // =========================
  // ESTADOS
  // =========================
  const [splash, setSplash] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productos, setProductos] = useState([]);

  // =========================
  // INIT ASYNC
  // =========================
  useEffect(() => {
    const init = async () => {
      try {
        await new Promise((r) => setTimeout(r, 2000));
        setSplash(false);

        setLoading(true);
        setError("");

        const res = await api.get("/products");
        setProductos(res.data);
      } catch (err) {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // =========================
  // SPLASH
  // =========================
  if (splash) {
    return (
      <div className="splash-screen">
        <h1>🍔 Hamburguesas UT</h1>
        <p>Cargando experiencia...</p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="error-screen">
        <h2>⚠️ Error</h2>
        <p>{error}</p>

        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  // =========================
  // SCROLL CARRUSEL
  // =========================
  const scroll = (dir) => {
    if (!carruselRef.current) return;

    const amount = 300;

    carruselRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* HERO */}
      <section className="home-hero">
        <h1>🍔 Hamburguesas UT</h1>
        <p>Los mejores sabores al instante</p>
      </section>

      {/* CARRUSEL */}
      <section className="home-section">
        <h2>🔥 Productos destacados</h2>

        <div className="carousel-wrapper">
          <button className="carousel-btn left" onClick={() => scroll("left")}>
            ❮
          </button>

          <div className="carousel" ref={carruselRef}>
            {productos.map((p) => (
              <div key={p._id || p.name} className="carousel-card">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>${p.price}</p>
              </div>
            ))}
          </div>

          <button className="carousel-btn right" onClick={() => scroll("right")}>
            ❯
          </button>
        </div>
      </section>

      {/* BOTÓN MENU */}
      <section className="home-cta">
        <button
          className="menu-btn"
          onClick={() => navigate("/menu")}
        >
          Ver todo el menú
        </button>
      </section>

      <FooterBar />
    </div>
  );
}

export default Home;