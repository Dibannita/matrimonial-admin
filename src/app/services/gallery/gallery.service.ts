import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Gallery} from '../../interfaces/gallery/gallery.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_BRAND = environment.apiBaseLink + '/api/gallery/';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addGallery
   * insertManyGallery
   * getAllGallerys
   * getGalleryById
   * updateGalleryById
   * updateMultipleGalleryById
   * deleteGalleryById
   * deleteMultipleGalleryById
   */

  addGallery(data: Gallery) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }

  insertManyGallery(data: Gallery[], option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'insert-many', mData);
  }

  getAllGalleries(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Gallery[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getGalleryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Gallery, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateGalleryById(id: string, data: Gallery) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleGalleryById(ids: string[], data: Gallery) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteGalleryById(id: string) {
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id);
  }

  deleteMultipleGalleryById(ids: string[]) {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple-gallery-by-id', {ids: ids});
  }


}
