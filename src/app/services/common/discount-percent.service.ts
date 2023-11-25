import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {DiscountPercent} from '../../interfaces/common/discount-percent.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_BRAND = environment.apiBaseLink + '/api/discount-percent/';


@Injectable({
  providedIn: 'root'
})
export class DiscountPercentService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addDiscountPercent
   * insertManyDiscountPercent
   * getAllDiscountPercents
   * getDiscountPercentById
   * updateDiscountPercentById
   * updateMultipleDiscountPercentById
   * deleteDiscountPercentById
   * deleteMultipleDiscountPercentById
   */

  addDiscountPercent(data: DiscountPercent):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllDiscountPercents(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: DiscountPercent[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getDiscountPercentById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: DiscountPercent, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateDiscountPercentById(id: string, data: DiscountPercent) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteDiscountPercentById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleDiscountPercentById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }

  // discountPercentGroupByField<T>(dataArray: T[], field: string): DiscountPercentGroup[] {
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
  //   return final as DiscountPercentGroup[];

  // }



}
