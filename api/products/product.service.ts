import { ProductModel, Product } from './products.model';

const productService = {
    getAllProducts: async (): Promise<Product[]> => ProductModel.find({}),
    getProductById: async (id: number): Promise<Product | null> => ProductModel.findOne({ id }),
    createProduct: async (product: Product): Promise<Product> => ProductModel.create(product),
    updateProduct: async (id: number, updatedProduct: Product): Promise<Product | null> =>
        ProductModel.findOneAndUpdate({ id }, updatedProduct, { new: true }),
    deleteProduct: async (id: number): Promise<Product | null> => ProductModel.findOneAndDelete({ id }),
    updateProductQuantity: async (id: number, operation: string): Promise<Product | null> => {
        const product = await ProductModel.findOne({ id });
        if (!product) {
            return null; // Product not found
        }
        if (operation === 'increment') {
            product.quantity += 1;
        } else if (operation === 'decrement') {
            if (product.quantity > 0) {
                product.quantity -= 1;
            }
        }

        // Save the updated product
        return product.save();
    },
};

export default productService;
