import axios from "axios";

{/*LA LIGA DE LA API ESTA SECRETA EN ENV*/}
const apiUsers = axios.create({
  baseURL: import.meta.env.VITE_APIUSERS_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiUsers;