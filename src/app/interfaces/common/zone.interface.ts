import { Area } from './area.interface';
import {Division} from './division.interface';

export interface Zone {
  _id?: string;
  name?: string;
  division?: Division;
  area?: Area;
  status?: string;
  priority?: number;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}

