import dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import checkoutRoutes from "./routes/checkout.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/checkout", checkoutRoutes);

const PORT = process.env.PORT || 3002;

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("MongoDB conectado ✅");
        app.listen(PORT, () => {
            console.log(`Checkout API iniciado en puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error de conexión a MongoDB ❌", err);
    });

export default app;