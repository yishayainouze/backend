// category.service.ts
import { CategoryModel } from './category.model';

export class CategoryService {
  async getAllCategories() {
    return await CategoryModel.find().exec();
  }

  async getCategoryById(id: string) {
    console.log("seervice"+ CategoryModel.findById(id));
    return await CategoryModel.findById(id);
  }


//   async function handleRequest() {
//     try {
//         const categoryId = '6551f4a1954043cf6d8650c2'; // לדוגמא
//         const categoryData = await categoryService.getCategoryById(categoryId);
//         console.log('service', categoryData);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

  // async createCategory(categoryData: any) {
  //   const category = new CategoryModel(categoryData);
  //   return await category.save();
  // }

  async updateCategory(id: string, categoryData: any) {
    return await CategoryModel.findByIdAndUpdate(id, categoryData, { new: true }).exec();
  }

  async deleteCategory(id: string) {
    return await CategoryModel.findByIdAndDelete(id).exec();
  }
}
