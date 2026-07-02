import * as cartService from "../services/cart.service.js";

export const checkout = async (req, res) => {
    try {
        const { userId, products, subtotal, iva, descuento, total } = req.body;

        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                paso: "Validar datos",
                error: "Datos incompletos: userId y products son requeridos"
            });
        }

        const resultado = await cartService.realizarCheckout({
            userId,
            products,
            subtotal,
            iva,
            descuento,
            total
        });

        res.status(201).json(resultado);

    } catch (error) {
        console.error("Error en checkout controller:", error.message);

        // Si el checkout-api devolvió un error estructurado, lo propagamos
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        res.status(500).json({
            success: false,
            paso: "Checkout",
            error: error.message
        });
    }
};