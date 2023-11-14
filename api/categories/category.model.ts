import mongoose, { Document, Schema } from 'mongoose';

export interface Category extends Document {
  img: string;
  name: string;
  description: string;
  numberOfClicks: number; // הוספת שדה חדש
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true }, // הוספת הגדרת שדה בסכמה
  numberOfClicks: { type: Number, required: true } // הוספת הגדרת שדה בסכמה
});

const CategoryModel = mongoose.model<Category>('categories', categorySchema);

export { CategoryModel };
