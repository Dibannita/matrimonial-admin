import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminPermissions } from '../../../enum/admin-permission.enum';
import { Order } from '../../../interfaces/common/order.interface';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../services/common/order.service';
import { AdminService } from '../../../services/admin/admin.service';
import { UiService } from '../../../services/core/ui.service';
import { ReloadService } from '../../../services/core/reload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../../services/core/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { Pagination } from '../../../interfaces/core/pagination';
import { FilterData } from '../../../interfaces/core/filter-data';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ConfirmDialogComponent } from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { NgClassService } from '../../../services/core/ng-class.service';
import {CITIES, MONTHS, PAYMENT_TYPES, REPORT_FILTER, YEARS} from '../../../core/utils/app-data';
import { Select } from '../../../interfaces/core/select';
import { OrderStatus } from '../../../enum/order.enum';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  years: Select[] = YEARS;
  months: Select[] = MONTHS;
  calculation: any = null;
  showCalculation: boolean = false;
  orders: Order[] = [];
  holdPrevData: Order[] = [];

  // Pagination
  currentPage = 1;
  totalOrders = 0;
  ordersPerPage = 30;
  totalOrdersStore = 0;

  toggleMenu: boolean = false;
  showPerPageList = [
    { num: '25' },
    { num: '50' },
    { num: '100' },
    { num: '500' },
    { num: '1000' },
  ];

  // SEARCH AREA
  searchOrders: Order[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // FilterData
  cities: string[] = CITIES;
  paymentTypes: Select[] = PAYMENT_TYPES;
  dateByReport: Select[] = REPORT_FILTER;

  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Sort
  sortQuery = { createdAt: -1 };
  activeSort: number = null;
  activeFilter1: number = null;
  activeFilter2: number = null;
  activeFilter5: number = null;
  activeFilter6: number = null;
  activeFilter7: number = null;

  // FilterData
  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subDataEight: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;
  private subForm: Subscription;

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private adminService: AdminService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ngClassService: NgClassService
  ) {}

  ngOnInit(): void {
    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe((qParam) => {
      if (qParam && qParam['page']) {
        this.currentPage = qParam['page'];
      } else {
        this.currentPage = 1;
      }
      this.getAllOrders();
    });
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue
      .pipe(
        // map(t => t.searchTerm)
        // filter(() => this.searchForm.valid),
        pluck('searchTerm'),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((data) => {
          this.searchQuery = data;
          if (this.searchQuery === '' || this.searchQuery === null) {
            this.searchOrders = [];
            this.orders = this.holdPrevData;
            this.totalOrders = this.totalOrdersStore;
            this.searchQuery = null;
            return EMPTY;
          }
          const pagination: Pagination = {
            pageSize: Number(this.ordersPerPage),
            currentPage: Number(this.currentPage) - 1,
          };
          // Select
          const mSelect = {
            orderId: 1,
            phoneNo: 1,
            city: 1,
            paymentType: 1,
            grandTotal: 1,
            checkoutDate: 1,
            orderStatus: 1,
            paymentStatus: 1,
            createdAt: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: {
              ...{ orderStatus: OrderStatus.DELIVERED },
              ...this.filter,
            },
            select: mSelect,
            sort: this.sortQuery,
          };
          return this.orderService.getAllOrders(filterData, this.searchQuery);
        })
      )
      .subscribe(
        (res) => {
          this.searchOrders = res.data;
          this.orders = this.searchOrders;
          this.totalOrders = res.count;
          this.currentPage = 1;
          this.router.navigate([], { queryParams: { page: this.currentPage } });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event } });
  }

  /**
   * FILTER DATA With Date Range
   */

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.start
      );
      const endDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.end
      );

      const qData = { checkoutDate: { $gte: startDate, $lte: endDate } };
      this.filter = { ...this.filter, ...qData };
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllOrders();
      }
    }
  }

  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllOrders();
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'paymentType': {
        this.filter = { ...this.filter, ...{ paymentType: value } };
        this.activeFilter1 = index;
        break;
      }
      case 'city': {
        this.filter = { ...this.filter, ...{ city: value } };
        this.activeFilter2 = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data

    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllOrders();
    }
  }

  /**
   * ON REMOVE ALL QUERY
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.sortQuery = { createdAt: -1 };
    this.filter = null;
    this.dataFormDateRange.reset();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllOrders();
    }
  }

  onChangeShowCalculation(event: any) {
    this.showCalculation = event;
    localStorage.setItem('showCalculation', String(this.showCalculation));
  }


  /**
   * HTTP REQ HANDLE
   * getAllOrders()
   */

  private getAllOrders() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.ordersPerPage),
      currentPage: Number(this.currentPage) - 1,
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      orderId: 1,
      phoneNo: 1,
      city: 1,
      paymentType: 1,
      grandTotal: 1,
      checkoutDate: 1,
      orderStatus: 1,
      paymentStatus: 1,
      createdAt: 1,
    };

    const filterData: FilterData = {
      pagination: pagination,
      filter: {
        ...{ orderStatus: OrderStatus.DELIVERED },
        ...this.filter,
      },
      select: mSelect,
      sort: this.sortQuery,
    };

    this.subDataOne = this.orderService
      .getAllOrders(filterData, this.searchQuery)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.orders = res.data;
          if (this.orders && this.orders.length) {
            this.totalOrders = res.count;
            if (!this.searchQuery) {
              this.holdPrevData = res.data;
              this.totalOrdersStore = res.count;
            }
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }


  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(type: string,) {
    switch (type) {
      case 'delete': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Delete',
            message: 'Are you sure you want delete this data?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            // this.deleteMultipleOrderById();
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   *onSelectShowPerPage()
   */

  onSelectShowPerPage(val) {
    this.ordersPerPage = val;
    this.getAllOrders();
  }





  get grandTotal(){
    return this.orders.map(f=> f.grandTotal).reduce((accumulator, Value) => accumulator + Value, 0)
  }


  /**
   * UI Essentials
   * onToggle()
   */
  onToggle() {

    this.toggleMenu = !this.toggleMenu;
  }

  /**
   * ON DESTROY
   */

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
    if (this.subDataSeven) {
      this.subDataSeven.unsubscribe();
    }
    if (this.subDataEight) {
      this.subDataEight.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
  }
}
