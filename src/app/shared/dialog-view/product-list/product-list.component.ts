import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Product } from '../../../interfaces/common/product.interface';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Publisher } from '../../../interfaces/common/publisher.interface';
import { Category } from '../../../interfaces/common/category.interface';
import { EMPTY, Subscription } from 'rxjs';
import { ProductService } from '../../../services/common/product.service';
import { CategoryService } from '../../../services/common/category.service';
import { PublisherService } from '../../../services/common/publisher.service';
import { AdminService } from '../../../services/admin/admin.service';
import { UiService } from '../../../services/core/ui.service';
import { ReloadService } from '../../../services/core/reload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../../services/core/utils.service';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { Pagination } from '../../../interfaces/core/pagination';
import { FilterData } from '../../../interfaces/core/filter-data';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ProductDiscountDialogComponent } from './product-discount-dialog/product-discount-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  // Store Data
  products: Product[] = [];
  holdPrevData: Product[] = [];
  allPushProducts: Product[] = [];

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 20;
  totalProductsStore = 0;

  // SEARCH AREA
  searchProducts: Product[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Selected Data
  selectedIds: string[] = [];
  unselectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // FilterData
  publishers: Publisher[] = [];
  categories: Category[] = [];

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

  // FilterData
  filter: any = { status: 'publish' };

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
    private productService: ProductService,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
    private adminService: AdminService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router,
    public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { ids: string[]; type: string; count?: number }
  ) {}

  ngOnInit(): void {
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllProducts();
    });

    // Track Dialog View
    this.router.navigate([], { queryParams: { productDialog: true } });

    // Check Already Selected Ids
    if (this.data && this.data.ids && this.data.ids.length) {
      this.selectedIds = this.data.ids;
    }

    // GET Data
    this.getAllProducts();

    // Filter Data
    this.getAllCategories();
    this.getAllPublishers();
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
            this.searchProducts = [];
            this.products = this.holdPrevData;
            this.totalProducts = this.totalProductsStore;
            this.searchQuery = null;
            return EMPTY;
          }
          const pagination: Pagination = {
            pageSize: Number(this.productsPerPage),
            currentPage: Number(this.currentPage) - 1,
          };
          // Select
          const mSelect = {
            name: 1,
            slug: 1,
            images: 1,
            category: 1,
            subCategory: 1,
            brand: 1,
            publisher: 1,
            costPrice: 1,
            salePrice: 1,
            discountType: 1,
            discountAmount: 1,
            hasVariations: 1,
            variations: 1,
            variationsOptions: 1,
            status: 1,
            unit: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: this.filter,
            select: mSelect,
            sort: this.sortQuery,
          };
          return this.productService.getAllProducts(
            filterData,
            this.searchQuery
          );
        })
      )
      .subscribe(
        (res) => {
          this.searchProducts = res.data;
          this.products = this.searchProducts;
          this.allPushProducts = this.utilsService.mergeArrayUnique(
            this.allPushProducts,
            this.products
          );
          this.totalProducts = res.count;
          this.currentPage = 1;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * ON Select Check
   * onCheckChange()
   * onAllSelectChange()
   */

  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      // if (this.data.type === 'single' && this.selectedIds.length === 1) {
      //   this.uiService.warn('Please select a single product');
      //   return;
      // }
      //
      // if (this.data.type === 'multiple' && this.selectedIds.length === this.data.count) {
      //   this.uiService.warn(`You can select only ${ this.data.count} products.`);
      //   return;
      // }
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex((f) => f === id);
      this.selectedIds.splice(i, 1);
      this.unselectedIds.push(id);
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.products.map((m) => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(
        this.selectedIds,
        currentPageIds
      );
      this.products.forEach((m) => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach((m) => {
        this.products.find((f) => f._id === m).select = false;
        const i = this.selectedIds.findIndex((f) => f === m);
        this.selectedIds.splice(i, 1);
        this.unselectedIds.push(m);
      });
    }
  }

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.currentPage = event;
    this.getAllProducts();
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

      const qData = { registrationAt: { $gte: startDate, $lte: endDate } };
      this.filter = { ...this.filter, ...qData };
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllProducts();
      }
    }
  }

  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllProducts();
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'category': {
        this.filter = { ...this.filter, ...{ 'category._id': value } };
        this.activeFilter1 = index;
        break;
      }
      case 'publisher': {
        this.filter = { ...this.filter, ...{ 'publisher._id': value } };
        this.activeFilter2 = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    this.currentPage = 1;
    this.getAllProducts();
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
    this.currentPage = 1;
    this.getAllProducts();
  }

  /**
   * DIALOG Action
   * onCancelDialog()
   * onConfirmDialog()
   * openProductDiscountDialog()
   */
  onCancelDialog() {
    this.dialogRef.close({ data: null });
    this.router.navigate([], { queryParams: null });
  }

  onConfirmDialog() {
    const selectedProducts = this.allPushProducts.filter((item) => {
      return this.selectedIds.indexOf(item._id) != -1;
    });

    this.router.navigate([], { queryParams: null });
    this.dialogRef.close({
      data: {
        selected:
          selectedProducts && selectedProducts.length ? selectedProducts : null,
        unselectedIds:
          this.unselectedIds && this.unselectedIds.length
            ? this.unselectedIds
            : null,
      },
    });
  }

  public openProductDiscountDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductDiscountDialogComponent, {
      data: product,
      panelClass: ['theme-dialog'],
      width: '90%',
      maxWidth: '480px',
      height: 'auto',
      maxHeight: '100vh',
      autoFocus: false,
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        // const selectVariationOption: VariationOption = dialogResult.data;
        // const sProduct = this.selectedProducts.find(f => f._id === product._id)
        // sProduct.salePrice = selectVariationOption.price;
        // sProduct.orderVariationOption = selectVariationOption;
        // sProduct.orderVariation = this.variationNormalizePipe.transform(selectVariationOption.variations);
      }
    });
  }

  /**
   * HTTP REQ HANDLE
   * getAllProducts()
   * getAllCategories()
   * getAllPublishers()
   * checkSelectionData()
   * checkAddedItems()
   */

  private getAllProducts() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.productsPerPage),
      currentPage: Number(this.currentPage) - 1,
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
      brand: 1,
      images: 1,
      category: 1,
      subCategory: 1,
      publisher: 1,
      costPrice: 1,
      salePrice: 1,
      discountType: 1,
      discountAmount: 1,
      hasVariations: 1,
      variations: 1,
      variationsOptions: 1,
      status: 1,
      unit: 1,
    };

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery,
    };

    this.subDataOne = this.productService
      .getAllProducts(filterData, this.searchQuery)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.products = res.data;
          if (this.products && this.products.length) {
            this.products.forEach((m, i) => {
              const index = this.selectedIds.findIndex((f) => f === m._id);
              this.products[i].select = index !== -1;
            });

            this.totalProducts = res.count;
            if (!this.searchQuery) {
              this.holdPrevData = res.data;
              this.totalProductsStore = res.count;
            }

            this.checkSelectionData();

            this.allPushProducts = this.utilsService.mergeArrayUnique(
              this.allPushProducts,
              this.products
            );
          }
          // this.router.navigate([], {queryParams: {productDialog: true}});
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }

  private getAllCategories() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataSix = this.categoryService
      .getAllCategory(filterData, null)
      .subscribe(
        (res) => {
          this.categories = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private getAllPublishers() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataSeven = this.publisherService
      .getAllPublisher(filterData, null)
      .subscribe(
        (res) => {
          this.publishers = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.products.forEach((m) => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    // check added items
    // if (this.data && this.data.ids && this.data.ids.length) {
    //   this.products.forEach((m, i) => {
    //     const index = this.data.ids.findIndex(f => f === m._id);
    //     this.products[i].select = index !== -1;
    //   });
    // }

    this.matCheckbox.checked = isAllSelect;
  }

  private checkAddedItems(ids: string[]) {
    this.products.forEach((m, i) => {
      const index = this.selectedIds.findIndex((f) => f === m._id);
      this.products[i].select = index !== -1;
    });
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
