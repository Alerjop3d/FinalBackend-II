import { Router } from "express";
import { UserController } from "../controllers/userControllers.js";

const router = Router();
const userController = new UserController();


router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/session/current', userController.getCurrentUser.bind(userController));
router.post('/sendPassToEmail', userController.sendPassToEmail.bind(userController));
router.post('/compareNewPass', userController.compareNewPass.bind(userController));

export default router;