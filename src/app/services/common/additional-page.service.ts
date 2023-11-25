import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {AdditionalPage} from '../../interfaces/common/additional-page.interface';

const API_PAGE = environment.apiBaseLink + '/api/additional-page/';


@Injectable({
  providedIn: 'root'
})
export class AdditionalPageService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addAdditionalPage
   * insertManyAdditionalPage
   * getAllAdditionalPages
   * getAdditionalPageById
   * updateAdditionalPageById
   * updateMultipleAdditionalPageById
   * deleteAdditionalPageById
   * deleteMultipleAdditionalPageById
   */

  addAdditionalPage(data: AdditionalPage) {
    return this.httpClient.post<ResponsePayload>
    (API_PAGE + 'add', data);
  }


  getAdditionalPageBySlug(slug: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: AdditionalPage, message: string, success: boolean }>(API_PAGE + slug, {params});
  }

  updateAdditionalPageBySlug(slug: string, data: AdditionalPage) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_PAGE + 'update-data/' + slug, data);
  }


  deleteAdditionalPageBySlug(slug: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_PAGE + 'delete-data/' + slug, {params});
  }


}
