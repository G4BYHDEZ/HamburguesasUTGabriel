import { cartAPI } from "../config/axios.js";

export const realizarCheckout = async (data) => {
    const response = await cartAPI.post("/checkout", data);
    return response.data;
};