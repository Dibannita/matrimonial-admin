import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ContactRequest} from '../../interfaces/common/contact-request.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';


const API_CONTACT_REQUEST_CONTROL = environment.apiBaseLink + '/api/contact-request/';

@Injectable({
  providedIn: 'root',
})
export class ContactRequestService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Contact Request Control
   */

  addContactRequest(data: ContactRequest) {
    return this.httpClient.post<{ message: string }>(API_CONTACT_REQUEST_CONTROL + 'add', data);
  }

  addContactRequestByAdmin(data: ContactRequest) {
    return this.httpClient.post<{ message: string }>(API_CONTACT_REQUEST_CONTROL + 'add-by-admin', data);
  }


  getAllContactRequests() {
    return this.httpClient.get<{data: ContactRequest[], message?: string}>(API_CONTACT_REQUEST_CONTROL + 'get-all-contact-request');
  }

  // getContactRequestByContactRequestId(id: string) {
  //   return this.httpClient.get<{data: ContactRequest, message?: string}>(API_CONTACT_REQUEST_CONTROL + 'get-contact-request-by-contact-request-id/' + id);
  // }


  getContactRequestByContactRequestId(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ContactRequest, message: string, success: boolean }>(API_CONTACT_REQUEST_CONTROL + id, {params});
  }

  editContactRequest(data: ContactRequest) {
    return this.httpClient.put<{ message: string }>(API_CONTACT_REQUEST_CONTROL + 'update', data);
  }

  updateContactRequestAndDelete(data: ContactRequest) {
    return this.httpClient.put<{ message: string }>(API_CONTACT_REQUEST_CONTROL + 'update-and-contact-request-remove', data);
  }

  deleteContactRequestByContactRequestId(id: string) {
    return this.httpClient.delete<{message?: string}>(API_CONTACT_REQUEST_CONTROL + 'delete/' + id);
  }

  getAllContactRequestsByQuery(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ContactRequest[], count: number, success: boolean }>(API_CONTACT_REQUEST_CONTROL + 'get-all-contact-request-by-query', filterData, {params});
  }

}
