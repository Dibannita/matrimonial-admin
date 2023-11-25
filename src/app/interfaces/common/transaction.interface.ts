export interface Transactions {
  _id?: string;
  transactionDate?: Date;
  transactionDateString?: string;
  dueAmount?: number;
  vednor?: any;
  paidAmount?: number;
  description?: string;
  images?: [string];
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
