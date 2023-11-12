// Dal.Products.ts

import ProductModel, { Product } from './products.model';

const productDAL = {
    getAllProducts: async (): Promise<Product[]> => {
        try {
            return await ProductModel.find();
        } catch (error) {
            throw new Error('Error fetching products');
        }
    },

    getProductById: async (id: number): Promise<Product | null> => {
        try {
            return await ProductModel.findOne({ id });
        } catch (error) {
            throw new Error('Error fetching product by ID');
        }
    },

    createProduct: async (product: Product): Promise<Product> => {
        try {
            return await ProductModel.create(product);
        } catch (error) {
            throw new Error('Error creating product');
        }
    },

    updateProduct: async (id: number, updatedProduct: Product): Promise<Product | null> => {
        try {
            return await ProductModel.findOneAndUpdate({ id }, updatedProduct, { new: true });
        } catch (error) {
            throw new Error('Error updating product');
        }
    },

    deleteProduct: async (id: number): Promise<Product | null> => {
        try {
            return await ProductModel.findOneAndDelete({ id });
        } catch (error) {
            throw new Error('Error deleting product');
        }
    },

    updateProductQuantity: async (id: number, operation: string): Promise<Product | null> => {
        try {
            const product = await ProductModel.findOne({ id });

            if (product) {
                if (operation === 'increment') {
                    product.quantity++;
                } else if (operation === 'decrement') {
                    if (product.quantity > 0) {
                        product.quantity--;
                    }
                }

                return await product.save();
            }

            return null;
        } catch (error) {
            throw new Error('Error updating product quantity');
        }
    },
};

export default productDAL;
