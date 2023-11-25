import { FileTypes } from '../../enum/file-types.enum';
import {FileFolder} from './file-folder.interface';

export interface Gallery {
  _id?: string;
  name?: string;
  url?: string;
  folder?: string;
  folderInfo?: FileFolder;
  type?: FileTypes;
  size?: number;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
