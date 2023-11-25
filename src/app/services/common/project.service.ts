import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';
import {Project} from '../../interfaces/common/project.interface';

const API_PROJECT = environment.apiBaseLink + '/api/user-project/';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addProject
   * insertManyProject
   * getAllProjects
   * getProjectById
   * updateProjectById
   * updateMultipleProjectById
   * deleteProjectById
   * deleteMultipleProjectById
   */

  addProject(data: Project) {
    return this.httpClient.post<ResponsePayload>
    (API_PROJECT + 'add', data);
  }


  getAllProjects(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Project[], count: number, success: boolean }>(API_PROJECT + 'get-user-task-by-user', filterData, {params});
  }

  updateProjectByIdUser(id: string, data: Project) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_PROJECT + 'update-data-by-user/' + id, data);
  }


  deleteProjectByIdUser(id: string) {
    return this.httpClient.delete<ResponsePayload>(API_PROJECT + 'delete-data-by-user/' + id);
  }


}
