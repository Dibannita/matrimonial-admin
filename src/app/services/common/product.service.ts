import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { Product } from '../../interfaces/common/product.interface';
import { FilterData } from '../../interfaces/core/filter-data';

const API_PRODUCT = environment.apiBaseLink + '/api/product/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllContactRequests(filterData: FilterData, searchQuery: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {}

  /**
   * addProduct
   * insertManyProduct
   * getAllProducts
   * getProductById
   * updateProductById
   * updateMultipleProductById
   * deleteProductById
   * deleteMultipleProductById
   */

  addProduct(data: Product) {
    return this.httpClient.post<ResponsePayload>(API_PRODUCT + 'add', data);
  }

  cloneSingleProduct(id: string) {
    return this.httpClient.post<ResponsePayload>(API_PRODUCT + 'clone', { id });
  }

  insertManyProduct(data: Product, option?: any) {
    const mData = { data, option };
    return this.httpClient.post<ResponsePayload>(
      API_PRODUCT + 'insert-many',
      mData
    );
  }

  getAllProducts(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{
      data: Product[];
      count: number;
      success: boolean;
    }>(API_PRODUCT + 'get-all', filterData, { params });
  }

  getProductById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{
      data: Product;
      message: string;
      success: boolean;
    }>(API_PRODUCT + id, { params });
  }

  updateProductById(id: string, data: Product) {
    return this.httpClient.put<{ message: string; success: boolean }>(
      API_PRODUCT + 'update/' + id,
      data
    );
  }

  updateMultipleProductById(ids: string[], data: Product) {
    const mData = { ...{ ids: ids }, ...data };
    return this.httpClient.put<ResponsePayload>(
      API_PRODUCT + 'update-multiple',
      mData
    );
  }

  deleteProductById(id: string) {
    return this.httpClient.delete<ResponsePayload>(
      API_PRODUCT + 'delete/' + id
    );
  }

  deleteMultipleProductById(ids: string[]) {
    return this.httpClient.post<ResponsePayload>(
      API_PRODUCT + 'delete-multiple',
      { ids: ids }
    );
  }
}
