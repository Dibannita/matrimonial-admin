import {Component, OnDestroy, OnInit} from '@angular/core';
import {SaleDashboard} from '../../interfaces/common/dashboard.interface';
import {DashboardService} from '../../services/common/dashboard.service';
import {Subscription} from 'rxjs';
import {AdminService} from 'src/app/services/admin/admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  USER_ROLE: any;
  saleDashboard: SaleDashboard = null;
  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.USER_ROLE = this.adminService.getAdminRole();
    this.getSalesDashboard();
  }


  /**
   * HTTP REQ HANDLE
   * getUserDashboard()
   */
  getSalesDashboard() {
    this.subDataOne = this.dashboardService.getSalesDashboard()
      .subscribe({
        next: (res) => {
          this.saleDashboard = res.data;
          console.log("this.saleDashboard", this.saleDashboard);

        },
        error: (err) => {
          console.log(err)
        }
      })
  }


  /**
   * NG ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }


}
