export interface AdminRole {
  readOnly?: boolean;
  _id?: string;
  name: string;
  slug: string;
  priority: number;
  pageId: string;
  access: PageAccess[];
  createdAt?: Date;
}

export interface PageAccess {
  page: string;
  modify: number[];
}
