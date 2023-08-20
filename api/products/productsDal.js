import products from '../../data.js';

const productDAL = {
    getAllProducts: () => products,
    getProductById: (id) => products.find(product => product.id === id),

    createProduct: (product) => {
        product.id = products.length + 1;
        products.push(product);
        return product;
    },
    
    updateProduct: (id, updatedProduct) => {
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            return products[index];
        }
        return null;
    },
    deleteProduct: (id) => {
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            return products.splice(index, 1)[0];
        }
        return null;
    },

    updateProductQuantity: (id, operation) => {
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            if (operation === 'increment') {
                products[index].quantity++;
            } else if (operation === 'decrement') {
                if (products[index].quantity > 0) {
                    products[index].quantity--;
                }
            }
            return products[index];
        }
        return null;
    },
};

export default productDAL;