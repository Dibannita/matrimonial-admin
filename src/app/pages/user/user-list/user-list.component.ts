import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterData } from '../../../interfaces/gallery/filter-data';
import { UiService } from '../../../services/core/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReloadService } from '../../../services/core/reload.service';
import { EMPTY, Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { Users } from '../../../interfaces/common/users.interface';
import { UsersService } from '../../../services/common/users.service';
import { AdminPermissions } from 'src/app/enum/admin-permission.enum';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UtilsService } from '../../../services/core/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/ui/confirm-dialog/confirm-dialog.component';
import { Publisher } from '../../../interfaces/common/publisher.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { Pagination } from '../../../interfaces/core/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { AdminService } from '../../../services/admin/admin.service';
import { UserDataService } from '../../../services/common/user-data.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { User } from 'src/app/interfaces/common/user.interface';
import { PublisherService } from '../../../services/common/publisher.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  toggleMenu: boolean = false;
  holdPrevData: Users[] = [];
  users: Users[] = [];
  publishers: Publisher[] = [];
  user: User;
  userCount = 0;
  id?: string;
  isLoading: boolean = true;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Date
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Search Area
  @ViewChild('searchForm') searchForm: NgForm;
  searchQuery = null;
  searchUser: Users[] = [];

  // Pagination
  currentPage = 1;
  totalUnit = 0;
  UsersPerPage = 5;
  totalUsersStore = 0;
  totalUsers = 0;
  // FilterData
  filter: any = null;
  sortQuery: any = null;
  activeFilter1: number = null;
  activeFilter2: number = null;
  activeFilter3: number = null;
  activeSort: number;
  number = [{ num: '10' }, { num: '25' }, { num: '50' }, { num: '100' }];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subRouteOne: Subscription;
  private subForm: Subscription;
  private subReload: Subscription;
  private subDataFour: Subscription;
  private subDataEight: Subscription;
  private subDataThree: Subscription;
  constructor(
    private adminService: AdminService,
    private usersService: UsersService,
    private userDataService: UserDataService,
    private uiService: UiService,
    private router: Router,
    private reloadService: ReloadService,
    private utilsService: UtilsService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private publisherService: PublisherService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Reload Data
    this.subReload = this.reloadService.refreshBrand$.subscribe(() => {
      this.getAllUser();
    });
    // Reload

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParamMap.subscribe((qParam) => {
      if (qParam && qParam.get('page')) {
        this.currentPage = Number(qParam.get('page'));
      } else {
        this.currentPage = 1;
      }

      this.getAllUser();
    });

    // Base Data
    this.getAdminBaseData();
    this.getAllPublisher();
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
            this.searchUser = [];
            this.users = this.holdPrevData;
            this.totalUsersStore = this.totalUsersStore;
            this.searchQuery = null;
            return EMPTY;
          }
          const pagination: Pagination = {
            pageSize: Number(this.UsersPerPage),
            currentPage: Number(this.currentPage) - 1,
          };

          // Select
          const mSelect = {
            name: 1,
            phone: 1,
            phoneNo: 1,
            username: 1,
            email: 1,
            description: 1,
            image: 1,
            profileImg: 1,
            transactionId: 1,
            amount: 1,
            hasAccess: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: this.filter,
            select: mSelect,
            sort: { createdAt: -1 },
          };

          return this.usersService.getAllUsers(filterData, this.searchQuery);
        })
      )
      .subscribe({
        next: (res) => {
          this.searchUser = res.data;
          this.users = this.searchUser;
          this.totalUnit = res.count;
          this.currentPage = 1;
          this.router.navigate([], { queryParams: { page: this.currentPage } });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * CHECK ADMIN PERMISSION
   * getAdminBaseData()
   * checkAddPermission()
   * checkDeletePermission()
   * checkEditPermission()
   */

  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
  }

  get checkAddPermission(): boolean {
    return this.permissions.includes(AdminPermissions.CREATE);
  }

  get checkDeletePermission(): boolean {
    return this.permissions.includes(AdminPermissions.DELETE);
  }

  get checkEditPermission(): boolean {
    return this.permissions.includes(AdminPermissions.EDIT);
  }

  /**
   *  Pagination
   * onPageChanged()
   */

  public onPageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event } });
  }

  /**
   * HTTP REQ HANDLE
   * getAllUser()
   * deleteMultipleUsersById()
   */

  private getAllUser() {
    const mSelect = {
      name: 1,
      createdAt: 1,
      status: 1,
      bioDataType: 1,
      height: 1,
      phoneNo: 1,
    };
    // Spinner..
    this.spinner.show();
    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: {
        name: 1,
        username: 1,
        phoneNo: 1,
        email: 1,
        referId: 1,
        profileImg: 1,
        createdAt: 1,
        transactionId: 1,
        amount: 1,
        hasAccess: 1,
      },
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.usersService.getAllUsers(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data;
          this.userCount = res.count;
          this.holdPrevData = this.users;
          this.totalUsersStore = this.userCount;
          // Spinner..
          this.isLoading = false;
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  private getAllPublisher() {
    // Select
    const mSelect = {
      image: 1,
      name: 1,
      createdAt: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.publisherService
      .getAllPublisher(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.publishers = res.data;
            console.log('publishers', this.publishers);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private updateMultipleUserById(data: any) {
    this.spinner.show();

    // Remove Current Admin Id
    const mSelectedIds = this.selectedIds.filter((m) => m !== this.adminId);
    this.userDataService.updateMultipleUserById(mSelectedIds, data).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message);
        }
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
  /**
   * CHECK ADMIN PERMISSION
   * onSelectShowPerPage()
   * checkAddPermission()
   * checkEditPermission()
   * checkDeletePermission()
   */
  onSelectShowPerPage(val) {
    this.UsersPerPage = val;
    this.getAllUser();
  }
  getStatus(data: any) {
    if (data.status === 'publish') {
      return true;
    } else {
      return false;
    }
  }
  onToggle() {
    console.log('Click');
    this.toggleMenu = !this.toggleMenu;
  }
  onToggleChange(event: MatSlideToggleChange, data: any) {
    this.user = data;
    if (event.checked === true) {
      const mData = {
        status: 'publish',
      };
      this.updateUsersById(mData);
    } else {
      const mData = {
        status: 'draft',
      };

      this.updateUsersById(mData);
    }
  }
  private cloneSingleUser(id: string) {
    this.spinner.show();
    this.subDataEight = this.usersService.cloneSingleUser(id).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message);
        }
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
  private deleteMultipleUsersById() {
    this.subDataTwo = this.usersService
      .deleteMultipleUserById(this.selectedIds)
      .subscribe({
        next: (res) => {
          if (res.success) {
            // Get Data array
            const selectedUsers = [];
            this.selectedIds.forEach((id) => {
              const fData = this.users.find((data) => data._id === id);
              if (fData) {
                selectedUsers.push(fData);
              }
            });

            this.selectedIds = [];
            this.uiService.success(res.message);

            // fetch Data

            if (this.currentPage > 1) {
              this.router.navigate([], { queryParams: { page: 1 } });
            } else {
              this.reloadService.needRefreshData$();
            }
          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * ON Select Check
   * onCheckChange()
   * onAllSelectChange()
   * onRemoveAllQuery()
   */

  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex((f) => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.users.map((m) => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(
        this.selectedIds,
        currentPageIds
      );
      this.users.forEach((m) => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach((m) => {
        this.users.find((f) => f._id === m).select = false;
        const i = this.selectedIds.findIndex((f) => f === m);
        this.selectedIds.splice(i, 1);
      });
    }
  }

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.activeFilter3 = null;
    this.sortQuery = { createdAt: -1 };
    this.filter = null;
    this.dataFormDateRange.reset();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllUser();
    }
  }

  /**
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   */
  public openConfirmDialog(type: string, data?: any) {
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
            this.deleteMultipleUsersById();
          }
        });
        break;
      }
      case 'edit': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Edit',
            message: 'Are you sure you want edit this data?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.updateMultipleUserById(data);
          }
        });
        break;
      }
      case 'clone': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Clone',
            message: 'Are you sure you want clone this data?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.cloneSingleUser(data);
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
   * Sorting
   * sortData()
   */

  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllUser();
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

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
  private updateUsersById(data: any) {
    this.subDataFour = this.usersService
      .updateUsersById(this.user._id, data)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.success(res.message);
            this.getAllUser();
            // Remove Old Image from Backend
          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  exportToAllExcel() {
    console.log('dfd');
    const date = this.utilsService.getDateString(new Date());

    // Select
    const mSelect = {
      name: 1,
      createdAt: 1,
      unit: 1,
      status: 1,
      bioDataType: 1,
      height: 1,
      phoneNo: 1,
    };

    const filterData: FilterData = {
      filter: null,
      select: mSelect,
      sort: this.sortQuery,
    };

    this.subDataOne = this.userDataService
      .getAllUsers(filterData, this.searchQuery)
      .subscribe({
        next: (res) => {
          const subscriptionReports = res.data;

          const mData = subscriptionReports.map((m) => {
            return {
              // image: m?.image,
              name: m?.name,
              username: m?.username,
              createdAt: this.utilsService.getDateString(m.createdAt),

              phoneNo: m?.phoneNo,
              email: m?.email,
            };
          });

          // console.warn(mData)
          // EXPORT XLSX
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mData);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Data');
          XLSX.writeFile(wb, `Users list Reports_${date}.xlsx`);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  /**
   * FILTER DATA & Sorting
   * filterData()
   * endChangeRegDateRange()
   * sortData()
   * onPageChanged()
   */

  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'user': {
        this.filter = { ...this.filter, ...{ 'user._id': value } };
        this.activeFilter2 = index;
        break;
      }
      case 'publishers': {
        this.filter = { ...this.filter, ...{ publishers: value } };
        this.activeFilter3 = index;
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
      this.getAllUser();
    }
  }
  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.start
      );
      const endDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.end
      );

      const qData = { createdAt: { $gte: startDate, $lte: endDate } };
      this.filter = { ...this.filter, ...qData };

      // Re-fetch Data based on the updated filter
      this.getAllUser();
    }
  }
}
