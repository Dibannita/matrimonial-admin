import { Product } from './product.interface';

export interface PromoOffer {
  image?: any;
  select?: boolean;
  _id?: string;
  title?: string;
  titleBn?: string;
  titleIt?: string;
  slug?: string;
  description?: string;
  descriptionBn?: string;
  descriptionIt?: string;
  bannerImage?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  products?: string[] | Product[];
  createdAt?: Date;
  updatedAt?: Date;
}
