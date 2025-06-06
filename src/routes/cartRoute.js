import { Router } from "express";
import { CartController } from "../controllers/cartController.js";

const cartController = new CartController();
const router = Router();


router.get('/', cartController.getCart.bind(cartController));
router.put('/product/:pid', cartController.addProductToCart.bind(cartController));
router.delete('/product/:pid', cartController.removeProductFromCart.bind(cartController));

export default router;