export interface Story {
  _id?: string;
  readOnly?: boolean;
  title?: string;
  image?: string;
  url?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
