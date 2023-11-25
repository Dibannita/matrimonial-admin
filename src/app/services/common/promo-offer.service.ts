import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/core/filter-data';
import { PromoOffer } from '../../interfaces/common/promo-offer.interface';

const API_BEST_DEAL = environment.apiBaseLink + '/api/promo-offer/';


@Injectable({
  providedIn: 'root'
})
export class PromoOfferService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addPromoOffer
   * insertManyPromoOffer
   * getAllPromoOffers
   * getPromoOfferById
   * updatePromoOfferById
   * updateMultiplePromoOfferById
   * deletePromoOfferById
   * deleteMultiplePromoOfferById
   */

  addPromoOffer(data: PromoOffer) {
    return this.httpClient.post<ResponsePayload>
      (API_BEST_DEAL + 'add', data);
  }

  insertManyPromoOffer(data: PromoOffer, option?: any) {
    const mData = { data, option }
    return this.httpClient.post<ResponsePayload>
      (API_BEST_DEAL + 'insert-many', mData);
  }

  getAllPromoOffers(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: PromoOffer[], count: number, success: boolean }>(API_BEST_DEAL + 'get-all', filterData, { params });
  }

  getPromoOfferById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: PromoOffer, message: string, success: boolean }>(API_BEST_DEAL + id, { params });
  }

  updatePromoOfferById(id: string, data: PromoOffer) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BEST_DEAL + 'update/' + id, data);
  }

  updateMultiplePromoOfferById(ids: string[], data: PromoOffer) {
    const mData = { ...{ ids: ids }, ...data }
    return this.httpClient.put<ResponsePayload>(API_BEST_DEAL + 'update-multiple', mData);
  }

  deletePromoOfferById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BEST_DEAL + 'delete/' + id, { params });
  }

  deleteMultiplePromoOfferById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BEST_DEAL + 'delete-multiple', { ids: ids }, { params });
  }


}
