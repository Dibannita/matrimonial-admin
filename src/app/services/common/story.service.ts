import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Story} from '../../interfaces/common/story.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_STORY = environment.apiBaseLink + '/api/story/';


@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addStory
   * insertManyStory
   * getAllStorys
   * getStoryById
   * updateStoryById
   * updateMultipleStoryById
   * deleteStoryById
   * deleteMultipleStoryById
   */

  addStory(data: Story) {
    return this.httpClient.post<ResponsePayload>
    (API_STORY + 'add', data);
  }

  insertManyStory(data: Story, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_STORY + 'insert-many', mData);
  }

  getAllStorys(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Story[], count: number, success: boolean }>(API_STORY + 'get-all', filterData, {params});
  }

  getStoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Story, message: string, success: boolean }>(API_STORY + id, {params});
  }

  updateStoryById(id: string, data: Story) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_STORY + 'update/' + id, data);
  }

  updateMultipleStoryById(ids: string[], data: Story) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_STORY + 'update-multiple', mData);
  }

  deleteStoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_STORY + 'delete/' + id, {params});
  }

  deleteMultipleStoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_STORY + 'delete-multiple', {ids: ids}, {params});
  }


}
