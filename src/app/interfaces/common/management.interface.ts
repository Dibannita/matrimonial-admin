export interface Management {
  _id?: string;
  name?: string;
  slug?: string;
  priority?: number;
  image?: string;
  mobileImage?: string;
  bannerType?: string;
  url?: string;
  email?: string;
  phone?: string;
  designation?: string;
  managementType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
