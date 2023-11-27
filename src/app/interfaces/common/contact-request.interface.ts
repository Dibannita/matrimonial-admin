import { Product } from './product.interface';
import { User } from './user.interface';


export interface ContactRequest {
  _id?: string;
  user?: string | User;
  product?: string | Product;
  requestDate: string;
  guardianName: string;
  status: boolean;
  guardianPhoneNo: string;
  replyDate: string;
}
