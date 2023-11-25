export interface WorkDirection {
  _id?: string;
  date?: Date;
  user?: string;
  month?: number;
  year?: number;
  list?: WorkDirectionList[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WorkDirectionList {
  _id: string;
  name: string;
  checked?: boolean;
  tag?: string;
  url?: string;
  note?: string;
}
