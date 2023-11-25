import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Users} from '../../interfaces/common/users.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_USERS = environment.apiBaseLink + '/api/user/';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addUsers
   * insertManyUsers
   * getAllUserss
   * getUsersById
   * updateUsersById
   * updateMultipleUsersById
   * deleteUsersById
   * deleteMultipleUsersById
   */

  addUser(data: Users) {
    console.log("service data form", data)
    return this.httpClient.post<ResponsePayload>
    (API_USERS + 'signup', data);
  }

  insertManyUser(data: Users, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_USERS + 'insert-many', mData);
  }

  getAllUsers(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Users[], count: number, success: boolean }>(API_USERS + 'get-all', filterData, {params});
  }

  getUsersById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Users, message: string, success: boolean }>(API_USERS + id, {params});
  }

  updateUsersById(id: string, data: Users) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_USERS + 'update-data/' + id, data);
  }


  deleteMultipleUserById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_USERS + 'delete-multiple-data-by-id', {ids: ids}, {params});
  }




}
