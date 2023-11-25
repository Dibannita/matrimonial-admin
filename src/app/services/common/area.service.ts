import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Area} from '../../interfaces/common/area.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_URL = environment.apiBaseLink + '/api/area/';


@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addArea()
   * insertManyArea()
   * getAllAreas()
   * getAreaById()
   * updateAreaById()
   * updateMultipleAreaById()
   * deleteAreaById()
   * deleteMultipleAreaById()
   * getAreaByParentId()
   */

  addArea(data: Area) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'add', data);
  }

  insertManyArea(data: Area, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'insert-many', mData);
  }

  getAllAreas(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Area[], count: number, success: boolean }>(API_URL + 'get-all', filterData, {params});
  }

  getAreaById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Area, message: string, success: boolean }>(API_URL + id, {params});
  }

  updateAreaById(id: string, data: Area) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL + 'update/' + id, data);
  }

  updateMultipleAreaById(ids: string[], data: Area) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_URL + 'update-multiple', mData);
  }

  deleteAreaById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_URL + 'delete/' + id, {params});
  }

  deleteMultipleAreaById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_URL + 'delete-multiple', {ids: ids}, {params});
  }


  getAreaByParentId(divisionId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Area[], message: string, success: boolean }>(API_URL + 'get-all-by-parent/' + divisionId, {params});
  }
}
