import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { NewSales, SalesCalculation } from '../../interfaces/common/new-sales.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { Observable } from "rxjs";

const API_NEW_SALES = environment.apiBaseLink + '/api/new-sales/';


@Injectable({
  providedIn: 'root'
})
export class NewSalesService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addNewSales
   * insertManyNewSales
   * getAllNewSaless
   * getNewSalesById
   * updateNewSalesById
   * updateMultipleNewSalesById
   * deleteNewSalesById
   * deleteMultipleNewSalesById
   */

  addNewSales(data: NewSales): Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_SALES + 'add', data);
  }

  getAllNewSales(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: NewSales[], count: number, success: boolean, calculation: SalesCalculation }>(API_NEW_SALES + 'get-all/', filterData, { params });
  }

  getNewSalesById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: NewSales, message: string, success: boolean }>(API_NEW_SALES + id, { params });
  }

  updateNewSalesById(id: string, data: NewSales) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEW_SALES + 'update/' + id, data);
  }


  // deleteNewSalesById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_SALES + 'delete/' + id);
  // }

  deleteNewSalesById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEW_SALES + 'delete/' + id, { params });
  }

  deleteMultipleProductById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_NEW_SALES + 'delete-multiple', { ids: ids }, { params });
  }


  // new-salesGroupByField<T>(dataArray: T[], field: string): NewSalesGroup[] {
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
  //   return final as NewSalesGroup[];

  // }



}
