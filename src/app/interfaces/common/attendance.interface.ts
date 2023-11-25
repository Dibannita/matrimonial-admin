export interface Attendance {
  _id?: string;
  date?: Date;
  dateString?: string;
  inTime?: string;
  outTime?: string;
  type?: string;
  standup?: boolean;
  user?: string;
  month?: number;
  year?: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
