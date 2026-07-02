import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarCredenciales = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMensaje("");

      const response = await api.post("/users/login", {
        email,
        password
      });

      // Guardar usuario (o token si tu API lo regresa después)
      localStorage.setItem("user",JSON.stringify(response.data));

      setMensaje("Login correcto");

      // Redirigir a home o dashboard
      navigate("/");

    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje ||
        "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-bg-wrapper">
      <Navbar />

      <div className="login-container">

        <div className="login-card">
          <h1>Iniciar sesión</h1>

          {mensaje && (
            <p className="login-message">
              {mensaje}
            </p>
          )}

          <form onSubmit={enviarCredenciales}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit" className="btn-primary">
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>

      <FooterBar />
    </div>
  );
}

export default Login;