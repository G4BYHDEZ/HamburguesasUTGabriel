import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiUsers from "../api/apiUsers";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [phone, setPhone] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const registrarUsuario = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMensaje("");

    try {
      if (password !== confirmarPassword) {
        setMensaje("Las contraseñas no coinciden.");
        return;
      }

      const response = await apiUsers.get("/users");

      const existe = response.data.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existe) {
        setMensaje("Ese correo ya está registrado.");
        return;
      }

      await apiUsers.post("/users", {
        email,
        username,
        password,
        name: {
          firstname,
          lastname,
        },
        address: {
          city,
          street,
          number,
          zipcode,
          geolocation: {
            lat,
            long,
          },
        },
        phone,
      });

      alert("Cuenta creada correctamente.");

      navigate("/login");
    } catch (error) {
      console.error(error);
      setMensaje("Error al registrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-bg-wrapper">
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          <h1>Crear cuenta</h1>

          {mensaje && (
            <p className="login-message">
              {mensaje}
            </p>
          )}

          <form onSubmit={registrarUsuario}>

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Nombre"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Calle"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Número"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Código Postal"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Latitud"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Longitud"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
          </form>

          <div className="login-switch">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="login-link">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>

      <FooterBar />
    </div>
  );
}

export default Register;