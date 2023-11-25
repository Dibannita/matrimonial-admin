import { Category } from "src/app/interfaces/common/category.interface";
import { SubCategory } from "src/app/interfaces/common/sub-category.interface";


export interface ChildCategory {
  _id?: string;
  readOnly?: boolean;
  category?: Category;
  subCategory?:SubCategory;
  categoryInfo?: Category;
  subCategoryInfo?: SubCategory;
  name?: string;
  slug?: string;
  image?: string;
  priority?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
