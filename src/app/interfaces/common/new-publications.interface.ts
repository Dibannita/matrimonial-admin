export interface NewPublications {
  select: boolean;
  _id?: string;
  date?: string;
  name?: string;
  dateString?: string;
  dueAmount?: number;
  paidAmount?: number;
  expenseFor?: string;
  description?: string;

  productCode?: string;
  writerName?: string;
  price?: string;
  discountPrice?: string;
  
  images?: [string];
  createdAt?: Date;
  updatedAt?: Date;
}
