import { Supplier } from './supplier.interface';
import { Product } from './product.interface';

export interface Purchase {
  _id?: string;
  supplier: Supplier;
  date?: string;
  product?: Product;
  productName?: string;
  referenceNo?: string;
  orderTax?: string;
  discount?: string;
  shipping?: string;
  status?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

