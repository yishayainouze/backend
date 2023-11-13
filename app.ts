// app.ts
import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import productRoute from './api/products/products.Routes';
import usersRoute from './api/users/routes.users';
import categoryRouter from './api/categories/category.routes'
import mongoose from 'mongoose';

const app: express.Application = express();
const PORT: number = 8080;

mongoose
  .connect('mongodb+srv://team-alpha:1234@cluster0.orqsdi2.mongodb.net/project-data')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const corsOptions: CorsOptions = {
  origin: '*',
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/api/products', productRoute);
app.use('/api/users', usersRoute);
app.use('/api/categories', categoryRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
