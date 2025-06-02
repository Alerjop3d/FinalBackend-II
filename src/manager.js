import { User } from './models/userModel.js';

class Writer {
  constructor(req) {
    this.userId = req.user._id; // Asumiendo que se quiere usar el userId del req
  }

  // Método para escribir datos en el archivo
  async updateCart(userId, cartData) {
    try {
      await User.findByIdAndUpdate(userId, { $set: { cart: cartData } });
      console.log('Carrito actualizado correctamente.');
    } catch (err) {
      console.error('Error al actualizar el carrito:', err);
    }
  }
}

export default Writer;