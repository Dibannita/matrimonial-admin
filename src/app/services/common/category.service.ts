import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { Category } from "../../interfaces/common/category.interface";
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';

const API_CATEGORY = environment.apiBaseLink + '/api/category/';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCategory
   * insertManyCategory
   * getAllCategorys
   * getCategoryById
   * updateCategoryById
   * updateMultipleCategoryById
   * deleteCategoryById
   * deleteMultipleCategoryById
   */

  // getAllCategories(filterData: FilterData, searchQuery?: string) {
  //   let params = new HttpParams();
  //   if (searchQuery) {
  //     params = params.append('q', searchQuery);
  //   }
  //   return this.httpClient.post<{ data: Category[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all', filterData, {params});
  // }

  addCategory(data: Category): Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'add', data);
  }

  getAllCategory(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Category[], count: number, success: boolean }>(API_CATEGORY + 'get-all/', filterData, { params });
  }

  getCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Category, message: string, success: boolean }>(API_CATEGORY + id, { params });
  }

  updateCategoryById(id: string, data: Category) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY + 'update/' + id, data);
  }


  // deleteCategoryById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id);
  // }

  deleteCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id, { params });
  }

  deleteMultipleCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'delete-multiple', { ids: ids }, { params });
  }

  // categoryGroupByField<T>(dataArray: T[], field: string): CategoryGroup[] {
  //   const data = dataArray.reduce((group, product) => {
  //     const uniqueField = product[field]
  //     group[uniqueField] = group[uniqueField] ?? [];
  //     group[uniqueField].push(product);
  //     return group;
  //   }, {});

  //   const final = [];

  //   for (const key in data) {
  //     final.push({
  //       _id: key,
  //       data: data[key]
  //     })
  //   }
  //   return final as CategoryGroup[];
  // }

}
