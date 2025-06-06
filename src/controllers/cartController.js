import Writer from "../manager.js";
const chargedCart = [];

export class CartController {
    async getCart(req, res) {
        try {        
            const manager = new Writer(req);
            chargedCart.length = 0;
            const cartItems = await manager.getCartItems();
            chargedCart.push(...JSON.parse(cartItems));
            res.json(chargedCart);
        } catch (error) {
            console.error('Error getting cart:', error);
            res.status(500).json({ message: 'Error getting cart' });
        }
    }

    async addProductToCart(req, res) {
        try {
            const product = req.body;
            const existingProductIndex = chargedCart.findIndex(p => p.id === product.id);

            if (existingProductIndex !== -1) {
                chargedCart[existingProductIndex].quantity += 1;
            } else {
                chargedCart.push({ ...product, quantity: 1 });
            }

            const manager = new Writer(req);
            await manager.updateCart(chargedCart);
            res.json(chargedCart);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            res.status(500).json({ message: 'Error saving product to cart' });
        }
    }

    async removeProductFromCart(req, res) {
        try {
            const product = req.body;
            const existingProductIndex = chargedCart.findIndex(p => p.id === product.id);

            if (existingProductIndex !== -1) {
                if (chargedCart[existingProductIndex].quantity > 1) {
                    chargedCart[existingProductIndex].quantity -= 1;
                } else {
                    chargedCart.splice(existingProductIndex, 1);
                }

                const manager = new Writer(req);
                await manager.updateCart(chargedCart);
                res.json(chargedCart);
            } else {
                res.status(404).json({ message: 'Product not found in cart' });
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
            res.status(500).json({ message: 'Error removing product from cart' });
        }
    }
}