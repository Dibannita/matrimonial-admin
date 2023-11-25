import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {WorkDirection} from '../../interfaces/common/work-direction.interface';

const API_WORK_DIRECTION = environment.apiBaseLink + '/api/task/';


@Injectable({
  providedIn: 'root'
})
export class WorkDirectionService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addWorkDirection
   * insertManyWorkDirection
   * getAllWorkDirections
   * getWorkDirectionById
   * updateWorkDirectionById
   * updateMultipleWorkDirectionById
   * deleteWorkDirectionById
   * deleteMultipleWorkDirectionById
   */

  getAllWorkDirections(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: WorkDirection[], count: number, success: boolean }>(API_WORK_DIRECTION + 'get-task-by-user', filterData, {params});
  }

  updateWorkDirectionItemById(data: { taskId: string, _id: string, checked: boolean }) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_WORK_DIRECTION + 'update-list-item-user', data);
  }


}
