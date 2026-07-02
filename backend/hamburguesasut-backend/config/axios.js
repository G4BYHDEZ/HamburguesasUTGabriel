import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const usersAPI = axios.create({
    baseURL: process.env.API_USERS
});

export const storeAPI = axios.create({
    baseURL: process.env.API_STORE
});

export const cartAPI = axios.create({
    baseURL: process.env.API_CART
});
export const getProducts = async () => {
  const res = await storeAPI.get("/products");
  return res.data;
};

