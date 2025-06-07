import jwt from 'jsonwebtoken';
import { promisify } from 'util';


export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export const authorize = (roles = []) => {
    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};





export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
}

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: 'No se proporcionó token' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Token inválido' });
    }
};

export const getName = (req, res, next) => {
  if (req.session.first_name) {
    res.locals.user = req.session.first_name;
  } else {
    res.locals.user = null;
  }
  next();
};

export const getCurrentUser = (req, res, next) => {
  if (req.user) {
    res.locals.usuario = req.user;
  } else {
    res.locals.usuario = null;
  }
  next();
};

