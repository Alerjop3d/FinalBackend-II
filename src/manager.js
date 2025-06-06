import { User } from './models/userModel.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

// ------------- nodemailer transport config ----------------->
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


class Writer {
  constructor (req) {
    this.userId = req.session.userId; 
  }

  // ------------- Update item por cart ----------------->
  async updateCart(cartData, userId = this.userId) {
    if (!userId) {
      console.error('No se proporcionó un userId válido.');
      return;
    }
    if (!cartData || typeof cartData !== 'object') {
      console.error('Datos del carrito no válidos:', cartData);
      return;
    }
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

  // ------------- Get cart items from user database ----------------->
  async getCartItems(userId = this.userId) {
    try {
      const cart = (await User.findById(userId, 'cart')).cart;
      return JSON.stringify(cart) || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // ------------- Send email to user ----------------->
  async sendMail(to, subject, text, html) {
    try {
      const mailOptions = {
        from: 'devicestore@mail.com',
        to,
        subject,
        text,
        html
      };
      await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }
}

export default Writer;
