import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import BreadcrumbProductos from "../components/BreadcrumbProductos";
import { useCart } from "../context/CartContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { items, addItem, updateQuantity, removeItem } = useCart();

  // =========================
  // FILTROS
  // =========================
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [orden, setOrden] = useState("");
  const [imagenActiva, setImagenActiva] = useState(null);


  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        console.log("📦 PRODUCTS:", response.data);

        setProductos(response.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // =========================
  // RATING
  // =========================
  const getAverageRating = (ratings = []) => {
    if (!Array.isArray(ratings) || ratings.length === 0) return 0;
    return ratings.reduce((a, r) => a + (r.value || 0), 0) / ratings.length;
  };

  const Stars = ({ rating = 0 }) => (
    <div className="stars-container hover-big">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(Math.max(rating - (i - 1), 0), 1);

        return (
          <div key={i} className="star">
            <div className="star-empty">☆</div>
            <div className="star-filled" style={{ width: `${fill * 100}%` }}>
              ★
            </div>
          </div>
        );
      })}
    </div>
  );

  // =========================
  // CARRITO helpers
  // =========================
  const getId = (p) => p._id || p.name;

  const getCantidad = (id) => {
    const item = items.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  // =========================
  // LIMPIAR FILTROS
  // =========================
  const limpiar = () => {
    setSearch("");
    setCategoria("todos");
    setOrden("");
  };

    // =========================
  // ABRIR IMAGENES
  // =========================
const abrirImagen = (index) => {
  document.body.classList.add("lightbox-open");
  setImagenActiva(index);
};

const cerrarImagen = () => {
  document.body.classList.remove("lightbox-open");
  setImagenActiva(null);
};

useEffect(() => {
  return () => {
    document.body.classList.remove("lightbox-open");
  };
}, []);

const siguienteImagen = () => {
  if (imagenActiva === null) return;

  setImagenActiva((imagenActiva + 1) % productosProcesados.length);
};

const anteriorImagen = () => {
  if (imagenActiva === null) return;

  setImagenActiva(
    (imagenActiva - 1 + productosProcesados.length) %
      productosProcesados.length
  );
};
  // =========================
  // FILTRADO + ORDEN
  // =========================
  const productosProcesados = productos
    .filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCat =
        categoria === "todos" || p.category === categoria;

      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (orden === "precio-asc") return a.price - b.price;
      if (orden === "precio-desc") return b.price - a.price;
      if (orden === "nombre-asc") return a.name.localeCompare(b.name);
      if (orden === "nombre-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  // =========================
  // AGRUPAR
  // =========================
  const productosPorCategoria = productosProcesados.reduce(
    (acc, p) => {
      const cat = p.category || "otros";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
      return acc;
    },
    {}
  );

  // =========================
  // PRODUCTO
  // =========================
  const renderProducto = (p) => {
    const id = getId(p);
    const rating = getAverageRating(p.rating);
    const cantidad = getCantidad(id);

    const sinStock = p.stock <= 0;

    return (
  <div key={id} className="producto-card">
<img
  src={p.image}
  className="producto-img"
  style={{ cursor: "pointer" }}
onClick={() => {
    const indice = productosProcesados.findIndex(
        (x) => (x._id || x.name) === id
    );

    if (indice !== -1) abrirImagen(indice);
}}
/>

    <div className="producto-body">
      <h3 className="producto-name">{p.name}</h3>

      <p className="producto-price">${p.price}</p>

      <p className="producto-extra">
        Categoría: {p.category}
      </p>

      <Stars rating={rating} />

      <p className="producto-rating-text">
        Rating: {rating.toFixed(1)} / 5
      </p>

      <p className={`producto-stock ${sinStock ? "out-stock" : ""}`}>
        Stock: {p.stock}
      </p>

      {p.description && p.description.trim() !== "" && (
        <>
          <p className="producto-stock">Ingredientes:</p>
          <p className="producto-extra">{p.description}</p>
        </>
      )}

      {sinStock ? (
        <button className="producto-btn" disabled>
          SIN STOCK
        </button>
      ) : cantidad === 0 ? (
        <button
          className="producto-btn"
          onClick={() => addItem(p)}
        >
          Agregar al carrito
        </button>
      ) : (
        <div className="cart-controls">
          <button onClick={() => updateQuantity(id, cantidad - 1)}>-</button>
          <span>{cantidad}</span>
          <button onClick={() => addItem(p)}>+</button>
        </div>
      )}
    </div>
  </div>
);
  };
const startX = useRef(0);
const startY = useRef(0);

const touchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
};

const touchEnd = (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

const dx = endX - startX.current;
const dy = endY - startY.current;

  // Horizontal
  if (Math.abs(dx) > Math.abs(dy)) {

    if (dx > 60)
      anteriorImagen();

    if (dx < -60)
      siguienteImagen();

  } else {

    // Vertical = cerrar
    if (Math.abs(dy) > 70)
      cerrarImagen();

  }
};
  return (
    <div className="hero-bg-wrapper">
      <Navbar />

      <div className="productos-container">
        <h1 className="productos-title">Menú</h1>

        {/* =========================
            FILTROS BAR
        ========================= */}
        <div className="filtros-bar">

        <input
          className="search-input"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => {
            const valor = e.target.value
              .replace(/[<>]/g, "")
              .slice(0, 50);

            setSearch(valor);
          }}
        />

          <select
            className="filter-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todos">Mostrar todos</option>
            <option value="comida">Comida</option>
            <option value="bebidas">Bebidas</option>
            <option value="postres">Postres</option>
          </select>

          <select
            className="filter-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Sin ordenar</option>
            <option value="precio-asc">Precio ↓</option>
            <option value="precio-desc">Precio ↑</option>
            <option value="nombre-asc">Nombre A-Z</option>
            <option value="nombre-desc">Nombre Z-A</option>
          </select>

          <button className="clear-btn" onClick={limpiar}>
            Limpiar
          </button>
        </div>
<BreadcrumbProductos
  search={search}
  categoria={categoria}
  orden={orden}
/>
        {/* ========================= */}
        {loading && <p className="productos-msg">Cargando...</p>}
        {error && <p className="productos-msg error">{error}</p>}

        {!loading &&
          !error &&
          Object.entries(productosPorCategoria).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="categoria-title">
                {cat.toUpperCase()}
              </h2>

              <div className="productos-grid">
                {items.map(renderProducto)}
              </div>
            </div>
          ))}
          </div>

{imagenActiva !== null && (
  <div
    className="lightbox"
    onClick={cerrarImagen}
    onTouchStart={touchStart}
    onTouchEnd={touchEnd}
  >

    <button
      className="lightbox-arrow left"
      onClick={(e) => {
        e.stopPropagation();
        anteriorImagen();
      }}
    >
      ❮
    </button>

    <div
      className="lightbox-content"
      onClick={(e) => e.stopPropagation()}
    >

      <img
        className="lightbox-img"
        src={productosProcesados[imagenActiva]?.image}
        alt={productosProcesados[imagenActiva]?.name}
      />

      <div className="lightbox-info">

        <h2>{productosProcesados[imagenActiva]?.name}</h2>

        <h3 className="lightbox-price">
          ${productosProcesados[imagenActiva]?.price}
        </h3>

        <p>
          <strong>Categoría:</strong>{" "}
          {productosProcesados[imagenActiva]?.category}
        </p>

        <Stars
          rating={getAverageRating(
            productosProcesados[imagenActiva]?.rating
          )}
        />

        <p>
          Rating:{" "}
          {getAverageRating(
            productosProcesados[imagenActiva]?.rating
          ).toFixed(1)} / 5
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {productosProcesados[imagenActiva]?.stock}
        </p>

        {productosProcesados[imagenActiva]?.description && (
          <>
            <h4>Ingredientes</h4>

            <p>
              {productosProcesados[imagenActiva]?.description}
            </p>
          </>
        )}

        {productosProcesados[imagenActiva]?.stock <= 0 ? (

          <button className="producto-btn" disabled>
            SIN STOCK
          </button>

        ) : getCantidad(
          getId(productosProcesados[imagenActiva])
        ) === 0 ? (

          <button
            className="producto-btn"
            onClick={() =>
              addItem(productosProcesados[imagenActiva])
            }
          >
            Agregar al carrito
          </button>

        ) : (

          <div className="cart-controls">

            <button
              onClick={() =>
                updateQuantity(
                  getId(productosProcesados[imagenActiva]),
                  getCantidad(getId(productosProcesados[imagenActiva])) - 1
                )
              }
            >
              -
            </button>

            <span>
              {getCantidad(
                getId(productosProcesados[imagenActiva])
              )}
            </span>

            <button
              onClick={() =>
                addItem(productosProcesados[imagenActiva])
              }
            >
              +
            </button>

          </div>

        )}

      </div>

    </div>

    <button
      className="lightbox-arrow right"
      onClick={(e) => {
        e.stopPropagation();
        siguienteImagen();
      }}
    >
      ❯
    </button>

  </div>
)}

      <FooterBar />
    </div>
  );
}

export default Productos;