import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {ChildCategory} from '../../interfaces/common/child-category.interface';
import {Category} from '../../interfaces/common/category.interface';

const API_URL = environment.apiBaseLink + '/api/child-category/';


@Injectable({
  providedIn: 'root'
})
export class ChildCategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addChildCategory
   * insertManyChildCategory
   * getAllCategories
   * getChildCategoryById
   * updateChildCategoryById
   * updateMultipleChildCategoryById
   * deleteChildCategoryById
   * deleteMultipleChildCategoryById
   */

  addChildCategory(data: ChildCategory) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'add', data);
  }

  insertManyChildCategory(data: ChildCategory, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'insert-many', mData);
  }

  getAllChildCategories(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ChildCategory[], count: number, success: boolean }>(API_URL + 'get-all', filterData, {params});
  }

  getChildCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ChildCategory, message: string, success: boolean }>(API_URL + id, {params});
  }

  getChildCategoriesByCategoryId(categoryId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ChildCategory[], message: string, success: boolean }>(API_URL + 'get-all-by-parent/' + categoryId, {params});
  }

  updateChildCategoryById(id: string, data: ChildCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL + 'update/' + id, data);
  }

  updateMultipleChildCategoryById(ids: string[], data: ChildCategory) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_URL + 'update-multiple', mData);
  }

  changeMultipleChildCategoryStatus(ids: string[], data: Category) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_URL + 'change-multiple-child-category-status', mData);
  }

  deleteChildCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_URL + 'delete/' + id, {params});
  }

  deleteMultipleChildCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_URL + 'delete-multiple', {ids: ids}, {params});
  }


}
