import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Customer} from '../../interfaces/common/customer.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_CATEGORY = environment.apiBaseLink + '/api/customer/';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCustomer
   * insertManyCustomer
   * getAllCustomers
   * getCustomerById
   * updateCustomerById
   * updateMultipleCustomerById
   * deleteCustomerById
   * deleteMultipleCustomerById
   */

  // getAllCategories(filterData: FilterData, searchQuery?: string) {
  //   let params = new HttpParams();
  //   if (searchQuery) {
  //     params = params.append('q', searchQuery);
  //   }
  //   return this.httpClient.post<{ data: Customer[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all', filterData, {params});
  // }

  addCustomer(data: Customer):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'add', data);
  }

  getAllCustomers(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Customer[], count: number, success: boolean }>(API_CATEGORY + 'get-all/', filterData, {params});
  }

  getCustomerById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Customer, message: string, success: boolean }>(API_CATEGORY + id, {params});
  }

  updateCustomerById(id: string, data: Customer) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY + 'update/' + id, data);
  }


  // deleteCustomerById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id);
  // }

  deleteCustomerById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleCustomerById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }




  // customerGroupByField<T>(dataArray: T[], field: string): CustomerGroup[] {
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
  //   return final as CustomerGroup[];

  // }



}
