import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import router from './api/products/products.Routes';
import mongoose from 'mongoose';

const app: express.Application = express();
const PORT: number = 8080;

mongoose.connect('mongodb+srv://team-alpha:1234@cluster0.orqsdi2.mongodb.net/project-data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

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

app.use('/api/products', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
