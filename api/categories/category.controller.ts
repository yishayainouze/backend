// category.controller.ts
import { Request, Response } from 'express';
import { CategoryService } from './category.service';

const categoryService = new CategoryService();

export class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    return await categoryService.getAllCategories();
  }

  async getCategoryById(req: Request, res: Response) {
    const categoryId = req.params.id;
    return await categoryService.getCategoryById(categoryId);
  }

  async createCategory(req: Request, res: Response) {
    const categoryData = req.body;
    return await categoryService.createCategory(categoryData);
  }

  async updateCategory(req: Request, res: Response) {
    const categoryId = req.params.id;
    const categoryData = req.body;
    return await categoryService.updateCategory(categoryId, categoryData);
  }

  async deleteCategory(req: Request, res: Response) {
    const categoryId = req.params.id;
    return await categoryService.deleteCategory(categoryId);
  }
}
