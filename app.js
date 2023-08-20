import express from 'express';
import morgan from 'morgan';
import router from './api/products/productsRouter.js';
import usersRouter from './api/products/users/router.users.js'
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(morgan('dev')); 

app.use('/api/products',router)
app.use('/api/products',usersRouter)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

