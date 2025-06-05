import { Router } from "express";
import { UserController } from "../controllers/userControllers.js";
import { authenticate } from "../middlewares/userMiddlewares.js";

const router = Router();
const userController = new UserController();


router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/session/current', userController.getCurrentUser.bind(userController));

export default router;