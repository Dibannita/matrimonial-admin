import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from 'src/app/interfaces/gallery/filter-data';
import {Admin} from 'src/app/interfaces/admin/admin';

const API_ADMIN = environment.apiBaseLink + '/api/admin/';


@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * getLoggedInAdminData
   * updateLoggedInAdminInfo
   * changeLoggedInAdminPassword
   * getAllAdmins
   * getAdminById
   * updateAdminById
   * updateMultipleAdminById
   * deleteAdminById
   * deleteMultipleAdminById
   */
  getLoggedInAdminData(select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }

    return this.httpClient.get<{ data: Admin }>(API_ADMIN + 'logged-in-admin-data', {params});
  }

  updateLoggedInAdminInfo(data: Admin) {
    return this.httpClient.put<ResponsePayload>(API_ADMIN + 'update-logged-in-admin', data);
  }

  changeLoggedInAdminPassword(data: { password: string, oldPassword: string }) {
    return this.httpClient.put<ResponsePayload>(API_ADMIN + 'change-logged-in-admin-password', data);
  }

  getAllAdmins(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }

    return this.httpClient.post<{ data: Admin[], count: number, success: boolean }>(API_ADMIN + 'all-admins', filterData, {params});
  }

  getAdminById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Admin, message: string, success: boolean }>(API_ADMIN + id, {params});
  }

  updateAdminById(id: string, data: Admin) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_ADMIN + 'update-admin/' + id, data);
  }

  updateMultipleAdminById(ids: string[], data: Admin) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_ADMIN + 'update-multiple-admin-by-id', mData);
  }

  deleteAdminById(id: string) {
    return this.httpClient.delete<ResponsePayload>(API_ADMIN + 'delete-admin/' + id);
  }

  deleteMultipleAdminById(ids: string[]) {
    return this.httpClient.post<ResponsePayload>(API_ADMIN + 'delete-multiple-admin-by-id', {ids: ids});
  }


}
