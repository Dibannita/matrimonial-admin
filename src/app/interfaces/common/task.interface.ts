export interface Task {
  _id?: string;
  user?: string;
  month?: number;
  year?: number;
  name?: string;
  project?: string;
  date?: Date;
  dateString?: string;
  time?: number;
  checked?: boolean;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskGroup {
  _id: string;
  data: Task[];
}
