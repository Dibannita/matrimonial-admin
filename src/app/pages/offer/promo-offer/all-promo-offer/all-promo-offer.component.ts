import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck, switchMap, } from 'rxjs/operators';
import { AdminPermissions } from 'src/app/enum/admin-permission.enum';
import { PromoOffer } from '../../../../interfaces/common/promo-offer.interface';
import { Pagination } from '../../../../interfaces/core/pagination';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { AdminService } from "../../../../services/admin/admin.service";
import { PromoOfferService } from '../../../../services/common/promo-offer.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { UiService } from '../../../../services/core/ui.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { FileUploadService } from '../../../../services/gallery/file-upload.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-all-promoOffers',
  templateUrl: './all-promo-offer.component.html',
  styleUrls: ['./all-promo-offer.component.scss'],
})
export class AllPromoOfferComponent implements OnInit, AfterViewInit, OnDestroy {
  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  toggleMenu: boolean = false;
  promoOffers: PromoOffer[] = [];
  holdPrevData: PromoOffer[] = [];
  promoOfferCount = 0;
  id?: string;

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
  searchPromoOffer: PromoOffer[] = [];

  // Pagination
  currentPage = 1;
  totalPromoOffers = 0;
  PromoOffersPerPage = 5;
  totalPromoOffersStore = 0;

  // FilterData
  filter: any = null;
  sortQuery: any = null;
  activeFilter1: number = null;
  activeFilter2: number = null;
  activeSort: number;
  number = [{ num: '10' }, { num: '25' }, { num: '50' }, { num: '100' }];


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subForm: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;

  constructor(
    private adminService: AdminService,
    private promoOfferService: PromoOfferService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private reloadService: ReloadService,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
    // Reload Data
    this.subReload = this.reloadService.refreshBrand$.subscribe(() => {
      this.getAllPromoOffer();
    });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParamMap.subscribe((qParam) => {
      if (qParam && qParam.get('page')) {
        this.currentPage = Number(qParam.get('page'));
      } else {
        this.currentPage = 1;
      }
      this.getAllPromoOffer();
    });

    // Base Data
    this.getAdminBaseData();
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
            this.searchPromoOffer = [];
            this.promoOffers = this.holdPrevData;
            this.totalPromoOffers = this.totalPromoOffersStore;
            this.searchQuery = null;
            return EMPTY;
          }
          const pagination: Pagination = {
            pageSize: Number(this.PromoOffersPerPage),
            currentPage: Number(this.currentPage) - 1,
          };

          // Select
          const mSelect = {
            title: 1,
            slug: 1,
            products: 1,
            promoOfferCode: 1,
            bannerImage: 1,
            description: 1,
            startDateTime: 1,
            endDateTime: 1,
            createdAt: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: this.filter,
            select: mSelect,
            sort: { createdAt: -1 },
          };

          return this.promoOfferService.getAllPromoOffers(
            filterData,
            this.searchQuery
          );
        })
      )
      .subscribe({
        next: (res) => {
          this.searchPromoOffer = res.data;
          this.promoOffers = this.searchPromoOffer;
          this.totalPromoOffers = res.count;
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
   * getAllPromoOffer()
   * deleteMultiplePromoOfferById()
   */

  private getAllPromoOffer() {
    // Select
    const mSelect = {
      title: 1,
      titleBn: 1,
      titleIt: 1,
      slug: 1,
      products: 1,
      promoOfferCode: 1,
      bannerImage: 1,
      description: 1,
      startDateTime: 1,
      endDateTime: 1,
      createdAt: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.promoOfferService
      .getAllPromoOffers(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.promoOffers = res.data;
            this.promoOfferCount = res.count;
            this.holdPrevData = this.promoOffers;
            this.totalPromoOffersStore = this.promoOfferCount;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private deleteMultiplePromoOfferById() {
    this.spinner.show();
    this.subDataTwo = this.promoOfferService
      .deleteMultiplePromoOfferById(this.selectedIds)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          if (res.success) {
            // Get Data array
            const selectedPromoOffer = [];
            this.selectedIds.forEach((id) => {
              const fData = this.promoOffers.find((data) => data._id === id);
              if (fData) {
                selectedPromoOffer.push(fData);
              }
            });
            this.selectedIds = [];
            this.uiService.success(res.message);
            // fetch Data
            if (this.currentPage > 1) {
              this.router.navigate([], { queryParams: { page: 1 } });
            } else {
              this.getAllPromoOffer();
            }
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinner.hide();
          console.log(error);
        })
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
    const currentPageIds = this.promoOffers.map((m) => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(
        this.selectedIds,
        currentPageIds
      );
      this.promoOffers.forEach((m) => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach((m) => {
        this.promoOffers.find((f) => f._id === m).select = false;
        const i = this.selectedIds.findIndex((f) => f === m);
        this.selectedIds.splice(i, 1);
      });
    }
  }

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
      this.getAllPromoOffer();
    }
  }

  /**
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   */
  public openConfirmDialog(type: string) {
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
            this.deleteMultiplePromoOfferById();
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
   *  Sorting
   * sortData()
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllPromoOffer();
  }


  /**
   * ON DESTROY
   * ngOnDestroy()
   */

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }

    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }
}
