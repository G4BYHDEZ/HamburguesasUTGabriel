import { getUsersService,loginService } from "../services/users.service.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        res.status(200).json({
            users
        });

    } catch (error) {
        res.status(500).json({
            message: "Error obteniendo usuarios",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email y password son obligatorios"
            });
        }

        const user = await loginService(email, password);
        if (!user) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }
        const { password: userPassword, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};