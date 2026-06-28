import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiUsers from "../api/apiUsers";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarCredenciales = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    try {
      const response = await apiUsers.get("/users");
      console.log(response.data);
      const usuario = response.data.find(
        (u) =>
          u.email === email &&
          u.password === password
      );
      if (!usuario) {
        setMensaje("Correo o contraseña incorrectos.");
        return;
      }
      // Guardar sesión
      localStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/");
    } catch (error) {
      console.error(error);
      setMensaje("No fue posible conectar con el servidor.");
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
            <p className="login-message">{mensaje}</p>
          )}
          <form onSubmit={enviarCredenciales}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
          <div className="login-switch">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="login-link">
                Crea una
              </Link>
            </p>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}
export default Login;