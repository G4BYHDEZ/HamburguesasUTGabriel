import axios from "axios";

const apiCheckout = axios.create({
  baseURL: import.meta.env.VITE_APICHECKOUT_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiCheckout;