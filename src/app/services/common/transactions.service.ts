import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";
import { Transactions } from 'src/app/interfaces/common/transaction.interface';

const API_NEW_TRANSACTION = environment.apiBaseLink + '/api/transactions/';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addTransactions
   * insertManyTransactions
   * getAllTransactions
   * getTransactionsById
   * updateTransactionsById
   * updateMultipleTransactionsById
   * deleteTransactionsById
   * deleteMultipleTransactionsById
   */

  addTransactions(data: Transactions):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_TRANSACTION + 'add', data);
  }

  getAllTransactions(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Transactions[], count: number, success: boolean }>(API_NEW_TRANSACTION + 'get-all/', filterData, {params});
  }

  getTransactionsById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Transactions, message: string, success: boolean }>(API_NEW_TRANSACTION + id, {params});
  }

  updateTransactionsById(id: string, data: Transactions) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEW_TRANSACTION + 'update/' + id, data);
  }


  // deleteTransactionsById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_TRANSACTION + 'delete/' + id);
  // }

  deleteTransactionsById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEW_TRANSACTION + 'delete/' + id, {params});
  }

  deleteMultipleTransactionsById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_NEW_TRANSACTION + 'delete-multiple', {ids: ids}, {params});
  }
}
