import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {ShippingCharge} from '../../interfaces/common/shipping-charge.interface';

const API_SHOP_INFO = environment.apiBaseLink + '/api/shipping-charge/';


@Injectable({
  providedIn: 'root'
})
export class ShippingChargeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addShippingCharge
   * insertManyShippingCharge
   * getAllShippingCharges
   * getShippingChargeById
   * updateShippingChargeById
   * updateMultipleShippingChargeById
   * deleteShippingChargeById
   * deleteMultipleShippingChargeById
   */

  addShippingCharge(data: ShippingCharge) {
    return this.httpClient.post<ResponsePayload>
    (API_SHOP_INFO + 'add', data);
  }


  getShippingCharge(select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ShippingCharge, message: string, success: boolean }>(API_SHOP_INFO + 'get', {params});
  }

  insertManyShippingCharge(data: ShippingCharge, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_SHOP_INFO + 'insert-many', mData);
  }

  getAllShippingCharges(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ShippingCharge[], count: number, success: boolean }>(API_SHOP_INFO + 'get-all', filterData, {params});
  }

  getShippingChargeById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ShippingCharge, message: string, success: boolean }>(API_SHOP_INFO + id, {params});
  }

  updateShippingChargeById(id: string, data: ShippingCharge) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_SHOP_INFO + 'update/' + id, data);
  }

  updateMultipleShippingChargeById(ids: string[], data: ShippingCharge) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_SHOP_INFO + 'update-multiple', mData);
  }

  deleteShippingChargeById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_SHOP_INFO + 'delete/' + id, {params});
  }

  deleteMultipleShippingChargeById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_SHOP_INFO + 'delete-multiple', {ids: ids}, {params});
  }


}
