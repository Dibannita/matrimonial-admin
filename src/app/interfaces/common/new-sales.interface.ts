import {Customer} from './customer.interface';

export interface NewSales {
  _id?: string;
  invoiceNo?: string;
  products?: any;
  month?: number;
  year?: number;
  customer?: Customer;
  salesman?: string;
  soldDate?: Date;
  subTotal?: number;
  total?: number;
  discountAmount?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  calculation?: SalesCalculation;
}

export interface SalesCalculation {
  grandTotal: number;
}
