import { Router } from "express";
const router = Router();

// ------------- Login views routes ----------------->
router.get("/login", (req, res) => { res.render("login", {layout : "simple"}) });
router.get("/register", (req, res) => { res.render("register", {layout : "simple"}) });
router.get("/profile", (req, res) => { res.render("profile", {layout : "simple"}) });


// ------------- Main e-commerce views routes ----------------->
router.get('/', (req, res) => { res.render('home') });
router.get('/news', (req, res) => { res.render('news') });
router.get('/about', (req, res) => { res.render('about') });
router.get('/contact', (req, res) => { res.render('contact') });
router.get('/:type', (req, res) => {
  const typeDevice = req.params.type;
  const allowedTypes = ['tablet', 'phone', 'laptop'];
  if (allowedTypes.includes(typeDevice)) {
    res.render('home', {});
  }
});
export default router;