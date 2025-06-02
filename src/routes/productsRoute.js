import { Router } from "express";
import totalProducts from '../models/inventary.js'

const router = Router();

// Middleware para obtener los productos
async function obtenerProductosMiddleware(req, res, next) {
  try {
    const result = await totalProducts.find();
    req.allProducts = result;
    next();
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
}

router.use(obtenerProductosMiddleware);

router.get("/", (req, res) => {
  const allProducts = req.allProducts;
  res.json(allProducts);
});

router.get("/:type", (req, res) => {
  const typeDevice = req.params.type;
  const productsFiltered = req.allProducts.filter(el => el.type === typeDevice)
  res.json(productsFiltered)
});

export default router;