import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Supplier} from '../../interfaces/common/supplier.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_SUPPLIER = environment.apiBaseLink + '/api/supplier/';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addSupplier
   * insertManySupplier
   * getAllSuppliers
   * getSupplierById
   * updateSupplierById
   * updateMultipleSupplierById
   * deleteSupplierById
   * deleteMultipleSupplierById
   */

  // getAllCategories(filterData: FilterData, searchQuery?: string) {
  //   let params = new HttpParams();
  //   if (searchQuery) {
  //     params = params.append('q', searchQuery);
  //   }
  //   return this.httpClient.post<{ data: Supplier[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all', filterData, {params});
  // }

  addSupplier(data: Supplier):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_SUPPLIER + 'add', data);
  }

  getAllSuppliers(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Supplier[], count: number, success: boolean }>(API_SUPPLIER + 'get-all/', filterData, {params});
  }

  getSupplierById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Supplier, message: string, success: boolean }>(API_SUPPLIER + id, {params});
  }

  updateSupplierById(id: string, data: Supplier) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_SUPPLIER + 'update/' + id, data);
  }


  // deleteSupplierById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_SUPPLIER + 'delete/' + id);
  // }

  deleteSupplierById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_SUPPLIER + 'delete/' + id, {params});
  }

  deleteMultipleSupplierById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_SUPPLIER + 'delete-multiple', {ids: ids}, {params});
  }

  // supplierGroupByField<T>(dataArray: T[], field: string): SupplierGroup[] {
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
  //   return final as SupplierGroup[];

  // }



}
