import { storeAPI } from "../config/axios.js";

export const getProducts = async () => {
    const response = await storeAPI.get("/products");
    return response.data;
};