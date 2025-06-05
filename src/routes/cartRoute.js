import { Router } from "express";
import Writer from "../manager.js";

const route = Router();
const chargedCart = [];



// ------------- Ruta GET para obtener un carrito por su ID ------------- //
route.get('/', async (req, res) => {
    const manager = new Writer(req);
    chargedCart.length = 0; // Limpiar el carrito cargado antes de llenarlo
    manager.getCartItems()
        .then((cartItems) => {
            chargedCart.push(...JSON.parse(cartItems));
            res.json(chargedCart);
            console.log('Carrito cargado:', chargedCart);
        })
        .catch((error) => {
            console.error('Error al obtener el carrito:', error);
            res.status(500).json({ mensaje: 'Error al obtener el carrito' });
        });
});


route.put('/product/:pid', (req, res) => {
    const product = req.body;
    const existingProductIndex = chargedCart.findIndex(p => p.id === product.id);
  
    if (existingProductIndex !== -1) {
      chargedCart[existingProductIndex].quantity += 1;
    } else {
      chargedCart.push({ ...product, quantity: 1 });
    }

    const manager = new Writer(req);
    manager.updateCart(chargedCart)
      .then(() => {
        res.json(chargedCart);
      })
      .catch(() => {
        res.status(500).json({ mensaje: 'Error al guardar el producto en el carrito' });
      });
  });  
 

  route.delete('/product/:pid', (req, res) => {
    const product = req.body;
    const existingProductIndex = chargedCart.findIndex(p => p.id === product.id);
  
    if (existingProductIndex !== -1) {
      if (chargedCart[existingProductIndex].quantity > 1) {
        chargedCart[existingProductIndex].quantity -= 1;
      } else {
        chargedCart.splice(existingProductIndex, 1);
      }
  
      const manager = new Writer(req);
      manager.updateCart(chargedCart)
        .then(() => {
          res.json(chargedCart);
        })
        .catch(() => {
          res.status(500).json({ mensaje: 'Error al eliminar el producto del carrito' });
        });
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });
    }
  });

  route.delete('/', (req, res) => {
    chargedCart.length = 0;
    res.json(chargedCart)
    const manager = new Writer(req);
    manager.updateCart([])
  })

export default route;