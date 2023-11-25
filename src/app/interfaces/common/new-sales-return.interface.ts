import {Customer} from "./customer.interface";

export interface NewSalesReturn {
  select: boolean;
  _id?: string;
  customer?: Customer;
  date?: string;
  referenceNo?: string;
  orderTax?: string;
  discount?: string;
  shipping?: string;
  status?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
