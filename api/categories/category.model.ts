// category.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Category extends Document {
  img: string;
  name: string;
  description: string;

}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const CategoryModel = mongoose.model<Category>('categories', categorySchema);

export { CategoryModel };
