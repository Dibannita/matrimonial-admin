import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {FileFolder} from '../../interfaces/gallery/file-folder.interface';

const API_BRAND = environment.apiBaseLink + '/api/file-folder/';


@Injectable({
  providedIn: 'root'
})
export class FileFolderService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addFileFolder
   * insertManyFileFolder
   * getAllFileFolders
   * getFileFolderById
   * updateFileFolderById
   * updateMultipleFileFolderById
   * deleteFileFolderById
   * deleteMultipleFileFolderById
   */

  addFileFolder(data: FileFolder) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }

  insertManyFileFolder(data: FileFolder, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'insert-many', mData);
  }

  getAllFileFolders(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: FileFolder[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getFileFolderById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: FileFolder, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateFileFolderById(id: string, data: FileFolder) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleFileFolderById(ids: string[], data: FileFolder) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteFileFolderById(id: string) {
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id);
  }


  deleteMultipleFileFolderById(ids: string[]) {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple-file-folder-by-id', {ids: ids});
  }
}
