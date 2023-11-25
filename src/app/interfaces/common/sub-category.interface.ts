import { Category } from './category.interface';

export interface SubCategory {
  slug: any;
  image: any;
  name?: string;
  select: Boolean;
  nameBn?: string;
  nameIt?: string;
  _id?: string;
  category?: Category;
  code?: string;
  description?: string;
  postType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
