import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {NewPublications} from '../../interfaces/common/new-publications.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";

const API_NEW_EXPENSE = environment.apiBaseLink + '/api/product/';


@Injectable({
  providedIn: 'root'
})
export class NewPublicationsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addNewPublications
   * insertManyNewPublications
   * getAllNewPublicationss
   * getNewPublicationsById
   * updateNewPublicationsById
   * updateMultipleNewPublicationsById
   * deleteNewPublicationsById
   * deleteMultipleNewPublicationsById
   */

  addNewPublications(data: NewPublications):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'add', data);
  }

  getAllNewPublications(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: NewPublications[], count: number, success: boolean }>(API_NEW_EXPENSE + 'get-all/', filterData, {params});
  }

  getNewPublicationsById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: NewPublications, message: string, success: boolean }>(API_NEW_EXPENSE + id, {params});
  }

  updateNewPublicationsById(id: string, data: NewPublications) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEW_EXPENSE + 'update/' + id, data);
  }


  // deleteNewPublicationsById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id);
  // }

  deleteNewPublicationsById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id, {params});
  }

  deleteMultipleNewPublicationsById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'delete-multiple', {ids: ids}, {params});
  }

  //  newPublicationsGroupByField<T>(dataArray: T[], field: string): NewPublicationsGroup[] {
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
  //   return final as NewPublicationsGroup[];

  // }



}
