import {AdminPermissions} from "../../enum/admin-permission.enum";

export interface AdminAuthResponse {
  success: boolean;
  token?: string;
  tokenExpiredIn?: number;
  data?: AdminAuthPayload;
  message?: string;
}

export interface AdminAuthPayload {
  _id: string;
  role: string;
  permissions: AdminPermissions[];
}
