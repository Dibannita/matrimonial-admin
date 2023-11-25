export interface Contact {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  queryType?: string;
  subject?: string;
  message?: string;
  receivingMails?: string;
  emailSent?: string;
  select?:boolean;
  createdAt?:Date;
}
