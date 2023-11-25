export interface Profile {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  image?: string;
  username?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  phoneNo?: string;
  select?: boolean;
}
