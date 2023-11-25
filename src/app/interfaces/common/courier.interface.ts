export interface Courier {
  select: boolean;
  image: string;
  _id?: string;
  readOnly?: boolean;

  name?: string;
  phoneNo?: string;

  // courierName?: string;
  // courierStatus?: string;
  // courierDate?: string;
  // courierOrderIds?: string;
}
