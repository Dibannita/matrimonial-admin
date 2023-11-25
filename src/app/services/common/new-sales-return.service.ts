import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {NewSalesReturn} from '../../interfaces/common/new-sales-return.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_NEW_SALES_RETURN = environment.apiBaseLink + '/api/new-sales-return/';


@Injectable({
  providedIn: 'root'
})
export class NewSalesReturnService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addNewSalesReturn
   * insertManyNewSales
   * getAllNewReturnSales
   * getNewSalesReturnById
   * updateNewSalesReturnById
   * updateMultipleNewSalesById
   * deleteNewSalesReturnById
   * deleteMultipleNewSalesReturnById
   */

  addNewSalesReturn(data: NewSalesReturn):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_SALES_RETURN + 'add', data);
  }

  getAllNewSalesReturn(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: NewSalesReturn[], count: number, success: boolean }>(API_NEW_SALES_RETURN + 'get-all/', filterData, {params});
  }

  getNewSalesReturnById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: NewSalesReturn, message: string, success: boolean }>(API_NEW_SALES_RETURN + id, {params});
  }

  updateNewSalesReturnById(id: string, data: NewSalesReturn) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEW_SALES_RETURN + 'update/' + id, data);
  }


  // deleteNewSalesReturnById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_SALES_RETURN + 'delete/' + id);
  // }

  deleteNewSalesReturnById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEW_SALES_RETURN + 'delete/' + id, {params});
  }

  // new-sales-returnGroupByField<T>(dataArray: T[], field: string): NewSalesGroup[] {
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
