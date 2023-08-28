import express,{cors} from 'express';
import morgan from 'morgan';
import router from './api/products/routes.product.js';
import usersRouter from './api/users/routes.users.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); 

app.use('/api/products',router)
app.use('/api/users',usersRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

