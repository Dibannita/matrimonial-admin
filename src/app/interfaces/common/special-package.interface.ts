import {Product, ProductSpecification} from './product.interface';
import {Variation} from "./variation.interface";

export interface SpecialPackage {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  discountType?: number;
  discountAmount?: number;
  salePrice?:number;
  active?:boolean;
  gifts?: ProductSpecification[];
  products?: string[] | Package_Items[] | Product[];
  createdAt?: Date;
  updatedAt?: Date;
  select?:boolean;
}

export interface Package_Items {
  _id?: string;
  product?: string | Product;
  hasVariations?: string;
  quantity?: string;
  selectedVariation?: Variation;
}
