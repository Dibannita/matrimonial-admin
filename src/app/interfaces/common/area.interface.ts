import { Division } from './division.interface';

export interface Area {
  _id?: string;
  name?: string;
  division?: Division;
  status?: string;
  priority?: number;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
