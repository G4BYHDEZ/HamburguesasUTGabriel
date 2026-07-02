import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { useNavigate } from "react-router-dom";

function Perfil() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        navigate("/login");
        return null;
    }

    const cerrarSesion = ()=>{
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    }

    return(
        <div className="hero-bg-wrapper">
            <Navbar/>
            <div className="perfil-container">
                <div className="perfil-card">

                    <div className="perfil-header">

                        <img
                            src={user.image}
                            alt={user.username}
                            className="perfil-avatar"
                        />

                        <h1 className="perfil-title">Mi Perfil</h1>

                        <p className="perfil-subtitle">
                            {user.role}
                        </p>

                    </div>

                    <div className="perfil-info">

                        <div className="perfil-item">
                            <span className="perfil-label">Usuario</span>
                            <span className="perfil-value">{user.username}</span>
                        </div>

                        <div className="perfil-item">
                            <span className="perfil-label">Nombre</span>
                            <span className="perfil-value">
                                {user.firstName} {user.maidenName} {user.lastName}
                            </span>
                        </div>

                        <div className="perfil-item">
                            <span className="perfil-label">Correo</span>
                            <span className="perfil-value">
                                {user.email}
                            </span>
                        </div>

                        <div className="perfil-item">
                            <span className="perfil-label">Teléfono</span>
                            <span className="perfil-value">
                                {user.phone}
                            </span>
                        </div>

                        <div className="perfil-item">
                            <span className="perfil-label">Edad</span>
                            <span className="perfil-value">
                                {user.age} años
                            </span>
                        </div>

                        <div className="perfil-item">
                            <span className="perfil-label">Universidad</span>
                            <span className="perfil-value">
                                {user.university}
                            </span>
                        </div>

                    </div>

                    <button
                        className="perfil-btn"
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