import productService from './productsService.js';

// Get all 
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await productService.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create  new 
const createProduct = async (req, res) => {
    const newProduct = req.body;
    try {
        const product = await productService.createProduct(newProduct);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update product 
const updateProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    try {
        const product = await productService.updateProduct(productId, updatedProduct);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete product 
const deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update  quantity
const updateProductQuantity = async (req, res) => {
    const productId = parseInt(req.params.id);
    const operation = req.body.operation; // 'increment' or 'decrement'
    try {
        const product = await productService.updateProductQuantity(productId, operation);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductQuantity
};