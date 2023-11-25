import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Vendor} from '../../interfaces/common/vendor.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_VENDOR = environment.apiBaseLink + '/api/vendor/';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addVendor
   * insertManyVendor
   * getAllVendors
   * getVendorById
   * updateVendorById
   * updateMultipleVendorById
   * deleteVendorById
   * deleteMultipleVendorById
   */

  // getAllCategories(filterData: FilterData, searchQuery?: string) {
  //   let params = new HttpParams();
  //   if (searchQuery) {
  //     params = params.append('q', searchQuery);
  //   }
  //   return this.httpClient.post<{ data: Vendor[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all', filterData, {params});
  // }

  addVendor(data: Vendor):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_VENDOR + 'add', data);
  }

  getAllVendors(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Vendor[], count: number, success: boolean }>(API_VENDOR + 'get-all/', filterData, {params});
  }

  getVendorById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Vendor, message: string, success: boolean }>(API_VENDOR + id, {params});
  }

  updateVendorById(id: string, data: Vendor) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_VENDOR + 'update/' + id, data);
  }


  // deleteVendorById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_VENDOR + 'delete/' + id);
  // }

  deleteVendorById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_VENDOR + 'delete/' + id, {params});
  }

  deleteMultipleVendorById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_VENDOR + 'delete-multiple', {ids: ids}, {params});
  }

  // vendorGroupByField<T>(dataArray: T[], field: string): VendorGroup[] {
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
  //   return final as VendorGroup[];

  // }



}
