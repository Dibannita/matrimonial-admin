import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Task, TaskGroup} from '../../interfaces/common/task.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';

const API_TASK = environment.apiBaseLink + '/api/task-flow/';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addTask
   * insertManyTask
   * getAllTasks
   * getTaskById
   * updateTaskById
   * updateMultipleTaskById
   * deleteTaskById
   * deleteMultipleTaskById
   */

  addTask(data: Task) {
    return this.httpClient.post<ResponsePayload>
    (API_TASK + 'add', data);
  }


  getAllTasks(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Task[], count: number, success: boolean }>(API_TASK + 'get-user-task-by-user', filterData, {params});
  }

  updateTaskByIdUser(id: string, data: Task) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_TASK + 'update-data-by-user/' + id, data);
  }


  deleteTaskByIdUser(id: string) {
    return this.httpClient.delete<ResponsePayload>(API_TASK + 'delete-data-by-user/' + id);
  }

  taskGroupByField<T>(dataArray: T[], field: string): TaskGroup[] {
    const data = dataArray.reduce((group, product) => {
      const uniqueField = product[field]
      group[uniqueField] = group[uniqueField] ?? [];
      group[uniqueField].push(product);
      return group;
    }, {});

    const final = [];

    for (const key in data) {
      final.push({
        _id: key,
        data: data[key]
      })
    }

    return final as TaskGroup[];

  }



}
