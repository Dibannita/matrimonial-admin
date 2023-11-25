import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Coupon} from '../../interfaces/common/coupon.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_TAG = environment.apiBaseLink + '/api/coupon/';


@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCoupon
   * insertManyCoupon
   * getAllCoupons
   * getCouponById
   * updateCouponById
   * updateMultipleCouponById
   * deleteCouponById
   * deleteMultipleCouponById
   */

  addCoupon(data: Coupon) {
    return this.httpClient.post<ResponsePayload>
    (API_TAG + 'add', data);
  }

  insertManyCoupon(data: Coupon, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_TAG + 'insert-many', mData);
  }

  getAllCoupons(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Coupon[], count: number, success: boolean }>(API_TAG + 'get-all', filterData, {params});
  }

  getCouponById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Coupon, message: string, success: boolean }>(API_TAG + id, {params});
  }

  updateCouponById(id: string, data: Coupon) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_TAG + 'update/' + id, data);
  }

  updateMultipleCouponById(ids: string[], data: Coupon) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_TAG + 'update-multiple', mData);
  }

  deleteCouponById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_TAG + 'delete/' + id, {params});
  }

  deleteMultipleCouponById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_TAG + 'delete-multiple', {ids: ids}, {params});
  }


}
