import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {SpecialPackage} from '../../interfaces/common/special-package.interface';

const API_BEST_DEAL = environment.apiBaseLink + '/api/special-package/';


@Injectable({
  providedIn: 'root'
})
export class SpecialPackageService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addSpecialPackage
   * insertManySpecialPackage
   * getAllSpecialPackages
   * getSpecialPackageById
   * updateSpecialPackageById
   * updateMultipleSpecialPackageById
   * deleteSpecialPackageById
   * deleteMultipleSpecialPackageById
   */

  addSpecialPackage(data: SpecialPackage) {
    return this.httpClient.post<ResponsePayload>
    (API_BEST_DEAL + 'add', data);
  }

  insertManySpecialPackage(data: SpecialPackage, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BEST_DEAL + 'insert-many', mData);
  }

  getAllSpecialPackages(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: SpecialPackage[], count: number, success: boolean }>(API_BEST_DEAL + 'get-all', filterData, {params});
  }

  getSpecialPackageById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SpecialPackage, message: string, success: boolean }>(API_BEST_DEAL + id, {params});
  }

  updateSpecialPackageById(id: string, data: SpecialPackage) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BEST_DEAL + 'update/' + id, data);
  }

  updateMultipleSpecialPackageById(ids: string[], data: SpecialPackage) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BEST_DEAL + 'update-multiple', mData);
  }

  deleteSpecialPackageById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BEST_DEAL + 'delete/' + id, {params});
  }

  deleteMultipleSpecialPackageById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BEST_DEAL + 'delete-multiple', {ids: ids}, {params});
  }


}
