import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {SeoPage} from '../../interfaces/common/seo-page.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_BRAND = environment.apiBaseLink + '/api/seoPage/';


@Injectable({
  providedIn: 'root'
})
export class SeoPageService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addSeoPage
   * getAllSeoPages
   * getSeoPageById
   * updateSeoPageById
   * deleteSeoPageById
   * deleteMultipleSeoPageById
   */

  addSeoPage(data: SeoPage):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllSeoPages(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: SeoPage[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getSeoPageById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SeoPage, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateSeoPageById(id: string, data: SeoPage) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteSeoPageById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleSeoPageById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }

  // seoPageGroupByField<T>(dataArray: T[], field: string): SeoPageGroup[] {
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
  //   return final as SeoPageGroup[];

  // }



}
