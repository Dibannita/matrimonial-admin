import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/core/filter-data';
import { MultiPromoOffer } from '../../interfaces/common/multi-promo-offer.interface';

const API_BEST_DEAL = environment.apiBaseLink + '/api/multi-Promo-offer/';

@Injectable({
  providedIn: 'root',
})
export class MultiPromoOfferService {
  constructor(private httpClient: HttpClient) {}

  /**
   * addMultiPromoOffer
   * insertManyMultiPromoOffer
   * getAllMultiPromoOffers
   * getMultiPromoOfferById
   * updateMultiPromoOfferById
   * updateMultipleMultiPromoOfferById
   * deleteMultiPromoOfferById
   * deleteMultipleMultiPromoOfferById
   */

  addMultiPromoOffer(data: MultiPromoOffer) {
    return this.httpClient.post<ResponsePayload>(API_BEST_DEAL + 'add', data);
  }

  insertManyMultiPromoOffer(data: MultiPromoOffer, option?: any) {
    const mData = { data, option };
    return this.httpClient.post<ResponsePayload>(
      API_BEST_DEAL + 'insert-many',
      mData
    );
  }

  getAllMultiPromoOffers(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{
      data: MultiPromoOffer[];
      count: number;
      success: boolean;
    }>(API_BEST_DEAL + 'get-all', filterData, { params });
  }

  getMultiPromoOfferById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{
      data: MultiPromoOffer;
      message: string;
      success: boolean;
    }>(API_BEST_DEAL + id, { params });
  }

  updateMultiPromoOfferById(id: string, data: MultiPromoOffer) {
    return this.httpClient.put<{ message: string; success: boolean }>(
      API_BEST_DEAL + 'update/' + id,
      data
    );
  }

  updateMultipleMultiPromoOfferById(ids: string[], data: MultiPromoOffer) {
    const mData = { ...{ ids: ids }, ...data };
    return this.httpClient.put<ResponsePayload>(
      API_BEST_DEAL + 'update-multiple',
      mData
    );
  }

  deleteMultiPromoOfferById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(
      API_BEST_DEAL + 'delete/' + id,
      { params }
    );
  }

  deleteMultipleMultiPromoOfferById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(
      API_BEST_DEAL + 'delete-multiple',
      { ids: ids },
      { params }
    );
  }
}
