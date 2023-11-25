import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {SubCategory} from '../../interfaces/common/sub-category.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Observable} from "rxjs";


const API_SUB_CATEGORY = environment.apiBaseLink + '/api/sub-category/';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  // getSubCategoriesByCategoryId(categoryId: string, select: string) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addsubCategory
   * insertManysubCategory
   * getAllsubCategory
   * getsubCategoryById
   * updatesubCategoryById
   * updateMultiplesubCategoryById
   * deletesubCategoryById
   * deleteMultiplesubCategoryById
   */

  addSubCategory(data: SubCategory):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_SUB_CATEGORY + 'add', data);
  }

  getAllSubCategory(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: SubCategory[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all/', filterData, {params});
  }

  getSubCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory, message: string, success: boolean }>(API_SUB_CATEGORY + id, {params});
  }

  getSubCategoriesByCategoryId(categoryId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory[], message: string, success: boolean }>(API_SUB_CATEGORY + 'get-all-by-parent/' + categoryId, {params});
  }

  updateSubCategoryById(id: string, data: SubCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_SUB_CATEGORY + 'update/' + id, data);
  }


  // deletesubCategoryById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_SUB_CATEGORY + 'delete/' + id);
  // }

  deleteSubCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_SUB_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleSubCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_SUB_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }

  // sub-categoryGroupByField<T>(dataArray: T[], field: string): subCategoryGroup[] {
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
  //   return final as subCategoryGroup[];

  // }



}
