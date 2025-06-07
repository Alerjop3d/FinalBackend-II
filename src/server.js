import cors from 'cors';
import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars'
import expressSession from 'express-session';

import cartRoute from './routes/cartRoute.js';
import userRoutes from './routes/usersRoute.js';
import viewsRoutes from './routes/viewsRoute.js';
import productsRoute from './routes/productsRoute.js';

import { initMongoDB } from './connections/mongo.js';
import * as middleware from './middlewares/userMiddlewares.js';

// ------------- Server config ----------------->
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(middleware.corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(expressSession({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// ------------- Middlewares ----------------->
app.use(middleware.getName);
app.use(middleware.errorHandler);
app.use(middleware.getCurrentUser);

// ------------- Handlebars ----------------->
app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs'); 
app.set('views', path.join(process.cwd(), 'src', 'views'));

// ------------- Mongo & routes ----------------->
initMongoDB()
  .then(() => console.log('conectado exitosamente a MongoDB'))
  .catch(err => console.error('error al conectar MongoDB:', err));
  
  app.use('/', viewsRoutes);
  app.use('/users', userRoutes);
  app.use('/api/cart', cartRoute);
  app.use('/api/products', productsRoute);
  
// ------------- Running app ----------------->
app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});


