// category.routes.ts
import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();
const categoryController = new CategoryController();

router.get('/', async (req, res) => {
    try {
      const categories = await categoryController.getAllCategories(req, res);
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal11111111 Server Error' });
    }
  });
  router.get('/:id', categoryController.getCategoryById);
// router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
// router.delete('/:id', categoryController.deleteCategory);

export default router;
