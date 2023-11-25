import { Customer } from './customer.interface';

export interface PreOrder {
  _id?: string;
  invoiceNo?: string;
  products?: any;
  customer?: Customer;
  salesman?: string;
  soldDate?: Date;
  subTotal?: number;
  total?: number;
  discountAmount?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  advanceAmount?: number;
  select?: boolean;
}
