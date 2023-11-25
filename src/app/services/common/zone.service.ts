import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Zone} from '../../interfaces/common/zone.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_URL = environment.apiBaseLink + '/api/zone/';


@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addZone()
   * insertManyZone()
   * getAllZones()
   * getZoneById()
   * updateZoneById()
   * updateMultipleZoneById()
   * deleteZoneById()
   * deleteMultipleZoneById()
   * getZoneByParentId()
   */

  addZone(data: Zone) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'add', data);
  }

  insertManyZone(data: Zone, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'insert-many', mData);
  }

  getAllZones(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Zone[], count: number, success: boolean }>(API_URL + 'get-all', filterData, {params});
  }

  getZoneById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Zone, message: string, success: boolean }>(API_URL + id, {params});
  }

  updateZoneById(id: string, data: Zone) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL + 'update/' + id, data);
  }

  updateMultipleZoneById(ids: string[], data: Zone) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_URL + 'update-multiple', mData);
  }

  deleteZoneById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_URL + 'delete/' + id, {params});
  }

  deleteMultipleZoneById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_URL + 'delete-multiple', {ids: ids}, {params});
  }


  getZoneByParentId(divisionId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Zone[], message: string, success: boolean }>(API_URL + 'get-all-by-parent/' + divisionId, {params});
  }
}
