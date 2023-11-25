import {AdminPermissions} from '../../enum/admin-permission.enum';
import {AdminRolesEnum} from '../../enum/admin.roles.enum';

export interface Admin {
  readOnly?: boolean;
  _id?: string;
  name: string;
  profileImg?: string;
  email?: string;
  username: string;
  phoneNo: string;
  gender?: string;
  role: AdminRolesEnum;
  permissions: AdminPermissions[];
  hasAccess: boolean;
  showTotalOrderValue?: boolean;
  downloadExcel?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  registrationAt?: string;
  lastLoggedIn?: Date;
  select?: boolean;
}
