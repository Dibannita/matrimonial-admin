export interface Newsletter {
  _id?: string;
  readOnly?: boolean;
  email?: string;
  number?: string;
  select?:boolean;
  createdAt?:Date;
}
