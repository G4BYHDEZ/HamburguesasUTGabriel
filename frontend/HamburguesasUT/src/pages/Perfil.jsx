import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { useNavigate } from "react-router-dom";

function Perfil() {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){
        navigate("/login");
        return null;
    }

    const cerrarSesion = ()=>{
        localStorage.removeItem("usuario");
        navigate("/");
        window.location.reload();
    }

    return(
        <div className="hero-bg-wrapper">
            <Navbar/>
            <div className="login-container">
                <div className="login-card">
                    <h1>Mi Perfil</h1>
                    <p>
                        <strong>Nombre de usuario:</strong>
                        {" "}
                        {usuario.username}
                    </p>
                    <p>
                        <strong>Nombre completo:</strong>
                        {" "}
                        {usuario.name.firstname} {usuario.name.lastname}
                    </p>
                    <p>
                        <strong>Correo:</strong>
                        {" "}
                        {usuario.email}
                    </p>
                    <p>
                        <strong>Telefono:</strong>
                        {" "}
                        {usuario.phone}
                    </p>
                    <button
                        className="btn-primary"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
            <FooterBar/>
        </div>
    );
}

export default Perfil;