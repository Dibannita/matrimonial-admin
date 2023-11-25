import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectSearchComponent } from 'ngx-mat-select-search';
import { EMPTY, ReplaySubject, Subject, filter, takeUntil, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SubCategory } from '../../../interfaces/common/sub-category.interface';
import { Pagination } from '../../../interfaces/core/pagination';
import { FilterData } from '../../../interfaces/gallery/filter-data';
import { SubCategoryService } from '../../../services/common/sub-category.service';
import { UtilsService } from '../../../services/core/utils.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-sub-category-select',
  templateUrl: './sub-category-select.component.html',
  styleUrls: ['./sub-category-select.component.scss']
})
export class SubCategorySelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  // Dynamic Component Data
  @Input('controlName') controlName: FormControl;
  @Input('required') required: boolean = false;
  @Input('placeholder') placeholder: string = 'Select';
  @Input('data') data: SubCategory;
  @Input('categoryId') categoryId: string;
  @Input('postType') postType: any;
  @Output('onSelect') onSelect = new EventEmitter();

  // Store Data
  filter = null;
  public dataList: SubCategory[] = [];
  public filteredDataList: ReplaySubject<SubCategory[]> = new ReplaySubject<SubCategory[]>(1);
  searchDataList: SubCategory[] = [];

  // Form Control
  public selectCtrl: FormControl;

  // Search Control
  public searchCtrl: FormControl = new FormControl();

  // Search Progress
  public searching = false;

  // Pagination
  currentPage = 1;
  dataPerPage = 10;
  totalData = 0;

  // Destroy
  protected _onDestroy = new Subject<void>();

  @ViewChild('matSearchSelect') matSearchSelect: MatSelectSearchComponent;

  constructor(
    private subCategoryService: SubCategoryService,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {
    if (this.controlName) {
      this.selectCtrl = this.controlName;
    } else {
      this.selectCtrl = new FormControl();
    }


  }


  ngOnChanges() {

    if (this.categoryId) {
      this.filter = { category: this.categoryId }
      // Default Data
      this.getAllCategoryList();
    }
    if (this.data) {
      this.dataList.push(this.data);
      this.selectCtrl.setValue(this.data);
    }
  }


  /**
   * MAIN SEARCH
   */
  ngAfterViewInit() {
    this.searchCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => {
          if (!this.searchCtrl.value.trim()) {
            this.searching = false;
            if (this.selectCtrl.value) {
              const singleArray = [this.selectCtrl.value];
              const allCategories = [...this.searchDataList, ...this.dataList]
              const selectedData = allCategories.filter(m => {
                return singleArray.some(n => n === m._id)
              });
              const uniqueData = this.utilsService.margeMultipleArrayUnique('_id', selectedData, selectedData);
              this.filteredDataList.next([...uniqueData, ...this.dataList]);
              return EMPTY;
            } else {
              this.filteredDataList.next([...this.dataList]);
              return EMPTY;
            }

          }

          const pagination: Pagination = {
            pageSize: 10,
            currentPage: 0,
          };

          // Select
          const mSelect = {
            name: 1,
            nameBn: 1,
            nameIt: 1,
            slug: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: this.filter,
            select: mSelect,
            sort: { createdAt: -1 },
          };

          return this.subCategoryService.getAllSubCategory(filterData, search);
        })
      )
      .subscribe({
        next: res => {
          this.searching = false;
          this.searchDataList = this.categoryId ? [...this.searchDataList, ...res.data] : [];
          this.filteredDataList.next(this.categoryId ? res.data : []);
        },
        error: error => {
          this.searching = false;
          console.log(error)
        }
      })
  }

  /**
   * GET NEXT DATA
   */
  getNextTestBatch() {
    if (this.searchCtrl.value) {
      return;
    }
    this.currentPage += 1;
    this.getAllCategoryList();
  }

  /**
   * HTTP REQ HANDLE
   * getAllCategoryList()
   */

  private getAllCategoryList() {
    // Select
    const mSelect = {
      name: 1,
      nameIt: 1,
      nameBn: 1,
      slug: 1,
    };


    const pagination: Pagination = {
      pageSize: this.dataPerPage,
      currentPage: this.currentPage - 1
    };

    const filter: FilterData = {
      filter: {...this.filter,...{postType: this.postType}} ,
      pagination: pagination,
      select: mSelect,
      sort: { createdAt: -1 },
    };
    this.subCategoryService.getAllSubCategory(filter, null)
      .subscribe({
        next: res => {

          this.totalData = res.count;
          if (this.selectCtrl.value) {
            const singleArray = [this.selectCtrl.value];
            const allCategories = [...this.searchDataList, ...this.dataList]
            const selectedData = allCategories.filter(m => {
              return singleArray.some(n => n === m._id)
            });
            const uniqueData = this.utilsService.margeMultipleArrayUnique('_id', selectedData, selectedData);
            this.dataList = [...this.dataList, ...res.data];
            this.filteredDataList.next([...uniqueData, ...this.dataList, ...res.data]);
          } else {
            this.dataList = [...this.dataList, ...res.data];
            this.filteredDataList.next(this.dataList);
          }
        },
        error: error => {
          console.log(error);
        }
      })
  }

  /**
   * ON CLEAR SEARCH
   * ON CLOSE PANEL
   */
  onClear() {
    this.searchCtrl.reset();
    this.getDefaultDataArray();
  }

  /**
   * DEFAULT COMPLEX DATA FOR SELECT TRACK
   */
  private getDefaultDataArray() {
    if (this.selectCtrl.value) {
      const singleArray = [this.selectCtrl.value];
      const allCategories = [...this.searchDataList, ...this.dataList]
      const selectedData = allCategories.filter(m => {
        return singleArray.some(n => n._id === m._id)
      });
      const uniqueData = this.utilsService.margeMultipleArrayUnique('_id', selectedData, selectedData);
      this.filteredDataList.next([...uniqueData, ...this.dataList]);
      this.selectCtrl.patchValue(uniqueData[0]);
    } else {
      this.filteredDataList.next([...this.dataList]);
    }
  }

    /**
   * ON SELECTION CHANGE
   * onSelectionChange()
  */
    onSelectionChange(event: MatSelectChange) {
      this.onSelect.emit(event.value);
    }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


}
