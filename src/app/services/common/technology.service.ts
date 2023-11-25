import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Technology} from '../../interfaces/common/technology.interface';
import { FilterData } from 'src/app/interfaces/gallery/filter-data';


const API_TECH = environment.apiBaseLink + '/api/technology/';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addTechnology
   * insertManyTechnology
   * getAllTechnologies
   * getTechnologyById
   * updateTechnologyById
   * updateMultipleTechnologyById
   * deleteTechnologyById
   * deleteMultipleTechnologyById
   */

  addTechnology(data: Technology) {
    return this.httpClient.post<ResponsePayload>
    (API_TECH + 'add', data);
  }

  insertManyTechnology(data: Technology, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_TECH + 'insert-many', mData);
  }

  getAllTechnologies(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Technology[], count: number, success: boolean }>(API_TECH + 'get-all', filterData, {params});
  }

  getTechnologyById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Technology, message: string, success: boolean }>(API_TECH + id, {params});
  }

  updateTechnologyById(id: string, data: Technology) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_TECH + 'update-data/' + id, data);
  }

  updateMultipleTechnologyById(ids: string[], data: Technology) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_TECH + 'update-multiple-data-by-id', mData);
  }

  deleteTechnologyById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_TECH + 'delete-data/' + id, {params});
  }

  deleteMultipleTechnologyById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_TECH + 'delete-multiple-data-by-id', {ids: ids}, {params});
  }


}
