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
      res.status(500).json({ error: 'Internal1 Server Error' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const category = await categoryController.getCategoryById(req, res);
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// router.post('/', categoryController.createCategory);
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await categoryController.updateCategory(req, res);
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// router.delete('/:id', categoryController.deleteCategory);

export default router;
