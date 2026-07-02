import * as storeService from "../services/store.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await storeService.getProducts();

    const clean = products.map(p => ({
      id: p._id?.toString?.() || p.id || p._id,
      name: p.title || p.name,
      price: p.price,
      category: p.category,
      subcategory: p.subcategory,
      description: p.description,
      image: p.image,
      stock: p.stock,
      rating: p.rating,
      includes: p.includes
    }));

    res.json(clean);

  } catch (error) {
    console.log("ERROR REAL:", error.message);

    res.status(500).json({
      mensaje: "Error al obtener productos",
      error: error.message
    });
  }
};