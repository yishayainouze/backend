import express from 'express';
import productController from './productsController.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id', productController.updateProductQuantity);

export default router;






















// import { Router } from "express";

// const router = Router();
// // Read all products
// router.get('/data', (req, res) => {
//     res.json(products);
// });

// // Read product by id
// router.get('/data/:id', (req, res) => {
//     const productId = parseInt(req.params.id);
//     const product = products.find(product => product.id === productId);
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).json({ message: 'Product not found' });
//     }
// });

// // Create a new product
// router.post('/products', (req, res) => {
//     const newProduct = req.body;
//     newProduct.id = products.length + 1; // Generate a unique id
//     products.push(newProduct);
//     res.status(201).json(newProduct);
// });

// // Update product by id
// router.put('/products/:id', (req, res) => {
//     const productId = parseInt(req.params.id);
//     const updatedProduct = req.body;
//     const index = products.findIndex(product => product.id === productId);
//     if (index !== -1) {
//         products[index] = { ...products[index], ...updatedProduct };
//         res.json(products[index]);
//     } else {
//         res.status(404).json({ message: 'Product not found' });
//     }
// });

// // Delete product by id
// router.delete('/products/:id', (req, res) => {
//     const productId = parseInt(req.params.id);
//     const index = products.findIndex(product => product.id === productId);
//     if (index !== -1) {
//         const deletedProduct = products.splice(index, 1)[0];
//         res.json(deletedProduct);
//     } else {
//         res.status(404).json({ message: 'Product not found' });
//     }
// });

// Increment or decrement product quantity by 1
router.patch('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const operation = req.body.operation; // 'increment' or 'decrement'
    const index = products.findIndex(product => product.id === productId);

    if (index !== -1) {
        if (operation === 'increment') {
            products[index].quantity++;
        } else if (operation === 'decrement') {
            if (products[index].quantity > 0) {
                products[index].quantity--;
            }
        }
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});
// export default router;


