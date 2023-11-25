import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Expense} from '../../interfaces/common/expense.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_NEW_EXPENSE = environment.apiBaseLink + '/api/expense/';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addExpense
   * insertManyExpense
   * getAllExpenses
   * getExpenseById
   * updateExpenseById
   * updateMultipleExpenseById
   * deleteExpenseById
   * deleteMultipleExpenseById
   */

  addExpense(data: Expense):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'add', data);
  }

  getAllExpense(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Expense[], count: number, success: boolean, calculation: any }>(API_NEW_EXPENSE + 'get-all/', filterData, {params});
  }

  getExpenseById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Expense, message: string, success: boolean }>(API_NEW_EXPENSE + id, {params});
  }

  updateExpenseById(id: string, data: Expense) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEW_EXPENSE + 'update/' + id, data);
  }


  // deleteExpenseById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id);
  // }

  deleteExpenseById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id, {params});
  }

  deleteMultipleExpenseById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'delete-multiple', {ids: ids}, {params});
  }

  //  expenseGroupByField<T>(dataArray: T[], field: string): ExpenseGroup[] {
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
  //   return final as ExpenseGroup[];

  // }



}
