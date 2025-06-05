import { User } from './models/userModel.js';

class Writer {
  constructor (req) {
    this.userId = req.session.userId; 
  }

  // Método para escribir datos en el archivo
  async updateCart(cartData, userId = this.userId) {
    if (!userId) {
      console.error('No se proporcionó un userId válido.');
      return;
    }
    if (!cartData || typeof cartData !== 'object') {
      console.error('Datos del carrito no válidos:', cartData);
      return;
    }
    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      console.error('Usuario no encontrado con el ID:', userId);
      return;
    }
    try {
      await User.findByIdAndUpdate(userId, { $set: { cart: cartData } });
      console.log('Carrito actualizado correctamente.');
      console.log('Datos del carrito:', cartData);
      console.log('ID del usuario:', userId);
    } catch (err) {
      console.log('Error al actualizar el carrito:', err);
      console.error('Error al actualizar el carrito:', err);
    }
  }
  // Método para obtener el carrito del usuario
  async getCartItems(userId = this.userId) {
    try {
      const cart = (await User.findById(userId, 'cart')).cart;
      return JSON.stringify(cart) || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}


export default Writer;