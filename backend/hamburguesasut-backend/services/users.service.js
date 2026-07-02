import { usersAPI } from "../config/axios.js";

export const getUsersService = async () => {
    const response = await usersAPI.get("/users");
    return response.data;
};

export const loginService = async (email, password) => {
    const response = await usersAPI.get("/users");
    const users = response.data.users;
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    return user || null;
};