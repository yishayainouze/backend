// category.service.ts
import { CategoryModel } from './category.model';

export class CategoryService {
  async getAllCategories() {
    return await CategoryModel.find().exec();
  }

  async getCategoryById(id: string) {
    return await CategoryModel.findById(id).exec();
  }

  async createCategory(categoryData: any) {
    const category = new CategoryModel(categoryData);
    return await category.save();
  }

  async updateCategory(id: string, categoryData: any) {
    return await CategoryModel.findByIdAndUpdate(id, categoryData, { new: true }).exec();
  }

  async deleteCategory(id: string) {
    return await CategoryModel.findByIdAndDelete(id).exec();
  }
}
