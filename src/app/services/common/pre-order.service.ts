import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {PreOrder} from '../../interfaces/common/pre-oder.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_NEW_PRE_ORDER = environment.apiBaseLink + '/api/pre-order/';


@Injectable({
  providedIn: 'root'
})
export class PreOderService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addNewPreOder
   * insertManyNewPreOder
   * getAllNewPreOders
   * getNewPreOderById
   * updateNewPreOderById
   * updateMultipleNewPreOderById
   * deleteNewPreOderById
   * deleteMultipleNewPreOderById
   */

  addNewPreOder(data: PreOrder):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_PRE_ORDER + 'add', data);
  }

  getAllNewPreOder(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: PreOrder[], count: number, success: boolean }>(API_NEW_PRE_ORDER + 'get-all/', filterData, {params});
  }

  getNewPreOderById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: PreOrder, message: string, success: boolean }>(API_NEW_PRE_ORDER + id, {params});
  }

  updateNewPreOderById(id: string, data: PreOrder) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEW_PRE_ORDER + 'update/' + id, data);
  }


  // deleteNewPreOderById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_PRE_ORDER + 'delete/' + id);
  // }

  deleteNewPreOderById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEW_PRE_ORDER + 'delete/' + id, {params});
  }

  deleteMultipleProductById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_NEW_PRE_ORDER + 'delete-multiple', {ids: ids}, {params});
  }


  // new-pre-orderGroupByField<T>(dataArray: T[], field: string): NewPreOderGroup[] {
  //   const data = dataArray.reduce((group, product) => {
  //     const uniqueField = product[field]
  //     group[uniqueField] = group[uniqueField] ?? [];
  //     group[uniqueField].push(product);
  //     return group;
  //   }, {});
  //
  //   const final = [];
  //
  //   for (const key in data) {
  //     final.push({
  //       _id: key,
  //       data: data[key]
  //     })
  //   }
  //
  //   return final as NewPreOderGroup[];

  // }



}
