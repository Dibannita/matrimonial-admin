import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {ShopInformation} from '../../interfaces/common/shop-information.interface';

const API_SHOP_INFO = environment.apiBaseLink + '/api/shop-information/';


@Injectable({
  providedIn: 'root'
})
export class ShopInformationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addShopInformation
   * insertManyShopInformation
   * getAllShopInformations
   * getShopInformationById
   * updateShopInformationById
   * updateMultipleShopInformationById
   * deleteShopInformationById
   * deleteMultipleShopInformationById
   */

  addShopInformation(data: ShopInformation) {
    return this.httpClient.post<ResponsePayload>
    (API_SHOP_INFO + 'add', data);
  }


  getShopInformation(select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ShopInformation, message: string, success: boolean }>(API_SHOP_INFO + 'get', {params});
  }

  insertManyShopInformation(data: ShopInformation, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_SHOP_INFO + 'insert-many', mData);
  }

  getAllShopInformations(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ShopInformation[], count: number, success: boolean }>(API_SHOP_INFO + 'get-all', filterData, {params});
  }

  getShopInformationById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ShopInformation, message: string, success: boolean }>(API_SHOP_INFO + id, {params});
  }

  updateShopInformationById(id: string, data: ShopInformation) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_SHOP_INFO + 'update/' + id, data);
  }

  updateMultipleShopInformationById(ids: string[], data: ShopInformation) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_SHOP_INFO + 'update-multiple', mData);
  }

  deleteShopInformationById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_SHOP_INFO + 'delete/' + id, {params});
  }

  deleteMultipleShopInformationById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_SHOP_INFO + 'delete-multiple', {ids: ids}, {params});
  }


}
