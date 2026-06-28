import axios from "axios";

{/*LA LIGA DE LA API ESTA SECRETA EN ENV*/}
const api = axios.create({
  baseURL: import.meta.env.VITE_APICARRITO_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiCarrito;