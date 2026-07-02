import mongoose from "mongoose";
import Cart from "../model/cart.js";

// Obtener el último id de carrito para auto-increment
async function getNextCartId() {
    const lastCart = await Cart.findOne().sort({ id: -1 });
    return lastCart ? lastCart.id + 1 : 1;
}

// Validar inventario consultando la colección products directamente
async function validarInventario(products, db) {
    const errores = [];

    for (const item of products) {
        const productId = item.productId;
        let product;

        // Intentar buscar por _id (ObjectId string) o por id numérico
        try {
            product = await db.collection("products").findOne({
                $or: [
                    { _id: new mongoose.Types.ObjectId(productId) },
                    { id: parseInt(productId) || productId }
                ]
            });
        } catch (_e) {
            product = await db.collection("products").findOne({ id: parseInt(productId) || productId });
        }

        if (!product) {
            errores.push(`Producto ${productId} no encontrado`);
        } else if (product.stock < item.quantity) {
            errores.push(`Stock insuficiente para "${product.name || productId}": disponible ${product.stock}, solicitado ${item.quantity}`);
        }
    }

    return errores;
}

export async function checkout(req, res) {
    const { userId, products, subtotal, iva, descuento, total } = req.body;

    const db = mongoose.connection.db;

    try {
        // =========================
        // PASO 1: Validar conexión
        // =========================
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                paso: "Validar conexión",
                error: "Base de datos no conectada"
            });
        }

        // =========================
        // PASO 2: Validar inventario
        // =========================
        const erroresStock = await validarInventario(products, db);
        if (erroresStock.length > 0) {
            return res.status(400).json({
                success: false,
                paso: "Validar inventario",
                errores: erroresStock
            });
        }

        // =========================
        // PASO 3: Calcular total (doble validación servidor)
        // =========================
        let subtotalCalculado = 0;
        for (const item of products) {
            const productId = item.productId;
            let product;
            try {
                product = await db.collection("products").findOne({
                    $or: [
                        { _id: new mongoose.Types.ObjectId(productId) },
                        { id: parseInt(productId) || productId }
                    ]
                });
            } catch (_e) {
                product = await db.collection("products").findOne({ id: parseInt(productId) || productId });
            }
            if (product) {
                subtotalCalculado += product.price * item.quantity;
            }
        }
        const ivaCalculado = subtotalCalculado * 0.16;
        const descuentoCalculado = descuento || 0;
        const totalCalculado = subtotalCalculado + ivaCalculado - descuentoCalculado;

        // =========================
        // PASO 4: Enviar pedido (crear documento)
        // =========================
        const nextId = await getNextCartId();
        const nuevoCart = new Cart({
            id: nextId,
            userId: userId,
            date: new Date(),
            products: products.map(p => ({
                productId: p.productId,
                quantity: p.quantity
            }))
        });

        // =========================
        // PASO 5: Guardar compra
        // =========================
        const savedCart = await nuevoCart.save();

        // =========================
        // PASO 6: Mostrar Ticket
        // =========================
        return res.status(201).json({
            success: true,
            ticket: {
                cartId: savedCart.id,
                userId: savedCart.userId,
                date: savedCart.date,
                products: savedCart.products,
                subtotal: subtotalCalculado,
                iva: ivaCalculado,
                descuento: descuentoCalculado,
                total: totalCalculado
            }
        });

    } catch (error) {
        console.error("Error en checkout:", error);
        return res.status(500).json({
            success: false,
            paso: "Guardar compra",
            error: error.message
        });
    }
}