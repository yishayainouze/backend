import productDAL from './productsDal.js';

const productService = {
    getAllProducts: async () => productDAL.getAllProducts(),
    getProductById: async (id) => productDAL.getProductById(id),
    createProduct: async (product) => productDAL.createProduct(product),
    updateProduct: async (id, updatedProduct) => productDAL.updateProduct(id, updatedProduct),
    deleteProduct: async (id) => productDAL.deleteProduct(id),
    updateProductQuantity: async (id, operation) => productDAL.updateProductQuantity(id, operation)
};

export default productService;
