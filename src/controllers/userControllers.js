import { User } from  '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'alejo2011'; 

export class UserController {
    async register(req, res) {
        try {
            const { first_name, last_name, email, age, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send({ message: 'Usuario ya existe' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                first_name,
                last_name,
                email,
                age,
                password: hashedPassword
            });
            await user.save();
            res.render('successRegis');
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({ message: 'Usuario no encontrado' });
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).send({ message: 'Contraseña incorrecta' });
            }
            
            req.session.user = usuario;
            req.session.userId = usuario._id;
            
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.render('profile', { first_name: user.first_name});
        } catch (error) {
            res.status(500).send({ message: 'Error al iniciar sesión' });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).send({ message: 'No se proporcionó token' });
            }
            
            const decoded = jwt.verify(token, secretKey);
            const user = await User.findById(decoded.userId).select('-password');
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            res.send(user);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener usuario actual' });
        }
    }
}



 
