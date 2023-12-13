import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PostCountDashboard } from '../../interfaces/common/dashboard.interface';
import { Observable } from 'rxjs';

const API_DASHBOARD = environment.apiBaseLink + '/api/dashboard/';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private postCountRes: any;

  constructor(private httpClient: HttpClient) {}

  getPostCount() {
    return this.httpClient.get<{
      data: PostCountDashboard;
      message: string;
      success: boolean;
    }>(API_DASHBOARD + 'post-count');
  }

  getPostCountWithCache() {
    return new Observable<{
      data: PostCountDashboard;
      message: string;
      success: boolean;
    }>((observer) => {
      if (this.postCountRes) {
        observer.next(this.postCountRes);
        observer.complete();
      } else {
        this.httpClient
          .get<{
            data: PostCountDashboard;
            message: string;
            success: boolean;
          }>(API_DASHBOARD + 'post-count')
          .subscribe({
            next: (res) => {
              this.postCountRes = res;
              observer.next(this.postCountRes);
              observer.complete();
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }
}
