import axios from "axios";

{/*LA LIGA DE LA API ESTA SECRETA EN ENV*/}
const apiStore = axios.create({
  baseURL: import.meta.env.VITE_APISTORE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiStore;