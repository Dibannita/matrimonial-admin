import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Division} from '../../interfaces/common/division.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_URL = environment.apiBaseLink + '/api/division/';


@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addDivision()
   * insertManyDivision()
   * getAllDivisions()
   * getDivisionById()
   * updateDivisionById()
   * updateMultipleDivisionById()
   * deleteDivisionById()
   * deleteMultipleDivisionById()
   */

  addDivision(data: Division) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'add', data);
  }

  insertManyDivision(data: Division, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'insert-many', mData);
  }

  getAllDivisions(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Division[], count: number, success: boolean }>(API_URL + 'get-all', filterData, {params});
  }

  getDivisionById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Division, message: string, success: boolean }>(API_URL + id, {params});
  }

  updateDivisionById(id: string, data: Division) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL + 'update/' + id, data);
  }

  updateMultipleDivisionById(ids: string[], data: Division) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_URL + 'update-multiple', mData);
  }

  deleteDivisionById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_URL + 'delete/' + id, {params});
  }

  deleteMultipleDivisionById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_URL + 'delete-multiple', {ids: ids}, {params});
  }

}
