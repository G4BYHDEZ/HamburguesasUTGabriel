import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

/*PAGINAS PRINCIPALES */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Perfil from "./pages/Perfil";
import ProtectedRoute from "./components/ProtectedRoute";

/*PAGINA ERROR */
import NotFound from "./pages/NotFound";

/*EXPORTAR RUTAS */
function App() {
    return (
        <CartProvider>
        <Routes>
            {/* PUBLICAS */}
            {/* MODULO 1: INICIO */}
            <Route path="/" element={<Home/>}/>

            {/* MODULO 2: CATALOGO */}
            <Route path="/menu" element={<Productos/>}/>

            {/* MODULO 3: CARRITO (PROTEGIDO) */}
            <Route path="/carrito" element={<ProtectedRoute><Carrito/></ProtectedRoute>}/>

            {/* MODULO 4: LOGIN */}
            <Route path="/login" element={<Login/>}/>

            {/* MODULO 4a: PERFIL */}
            <Route path="/perfil" element={<ProtectedRoute><Perfil/></ProtectedRoute>}/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </CartProvider>
    );
}

export default App;