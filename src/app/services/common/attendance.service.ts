import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Attendance} from '../../interfaces/common/attendance.interface';
import {FilterData} from '../../interfaces/gallery/filter-data';

const API_ATTENDANCE = environment.apiBaseLink + '/api/attendance/';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addAttendance
   * insertManyAttendance
   * getAllAttendances
   * getAttendanceById
   * updateAttendanceById
   * updateMultipleAttendanceById
   * deleteAttendanceById
   * deleteMultipleAttendanceById
   */

  addAttendance(data: Attendance) {
    return this.httpClient.post<ResponsePayload>
    (API_ATTENDANCE + 'add', data);
  }

  getAllAttendances(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Attendance[], count: number, success: boolean }>(API_ATTENDANCE + 'get-user-attendance-by-user', filterData, {params});
  }

  getAttendanceByDate(date: string, select?: string) {
    let params = new HttpParams();
    if (date) {
      params = params.append('date', date);
    }
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Attendance, message: string, success: boolean }>(API_ATTENDANCE + 'get-by-date', {params});
  }


}
