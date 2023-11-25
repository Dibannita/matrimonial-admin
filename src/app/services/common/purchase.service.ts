import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Purchase} from '../../interfaces/common/purchase.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_NEW_PURCHASE = environment.apiBaseLink + '/api/purchase/';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addPurchase
   * insertManyPurchase
   * getAllPurchases
   * getPurchaseById
   * updatePurchaseById
   * updateMultiplePurchaseById
   * deletePurchaseById
   * deleteMultiplePurchaseById
   */

  addPurchase(data: Purchase):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_PURCHASE + 'add', data);
  }

  getAllPurchase(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Purchase[], count: number, success: boolean }>(API_NEW_PURCHASE + 'get-all/', filterData, {params});
  }

  getPurchaseById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Purchase, message: string, success: boolean }>(API_NEW_PURCHASE + id, {params});
  }

  updatePurchaseById(id: string, data: Purchase) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEW_PURCHASE + 'update/' + id, data);
  }


  // deletePurchaseById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_PURCHASE + 'delete/' + id);
  // }

  deletePurchaseById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEW_PURCHASE + 'delete/' + id, {params});
  }

  // purchaseGroupByField<T>(dataArray: T[], field: string): PurchaseGroup[] {
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
  //   return final as PurchaseGroup[];

  // }



}
