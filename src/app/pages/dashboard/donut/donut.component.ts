import {Component, OnInit, ViewChild} from '@angular/core';
import {ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent} from 'ng-apexcharts';
import {Subscription} from 'rxjs';
import {AdminService} from 'src/app/services/admin/admin.service';
import {DashboardService} from 'src/app/services/common/dashboard.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss'],
})
export class DonutComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private dashboardService: DashboardService,
    private adminService: AdminService
  ) {
    this.chartOptions = {
      series: [0, 0, 0, 0],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  USER_ROLE: any;
  saleDashboard: any;
  totalOrders: any;
  totalPendingOrders: any;
  totalProducts: any;
  monthlyDeliveredOrders: any;

  // Subscriptions
  private subDataOne: Subscription;

  ngOnInit(): void {
    this.USER_ROLE = this.adminService.getAdminRole();

    this.subDataOne = this.dashboardService.getSalesDashboard().subscribe({
      next: (res) => {
        this.saleDashboard = res?.data;

        this.totalOrders = this.saleDashboard?.totalOrders;
        this.totalPendingOrders = this.saleDashboard?.totalPendingOrders;
        this.totalProducts = this.saleDashboard?.totalProducts;
        this.monthlyDeliveredOrders = this.saleDashboard?.monthlyDeliveredOrders;


        // rount chart
        const mul: any[] = [
          this.totalOrders,
          this.totalPendingOrders,
          this.totalProducts,
          this.monthlyDeliveredOrders,
        ];
        this.chartOptions = {
          series: mul,
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: [
            ' Total Orders',
            'Total Pending Orders',
            'Total Products',
            'Monthly Delivered Orders',
          ],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
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
