import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Publisher} from '../../../interfaces/common/publisher.interface';
import {EMPTY, filter, ReplaySubject, Subject, takeUntil, tap} from 'rxjs';
import {MatSelectSearchComponent} from 'ngx-mat-select-search';
import {PublisherService} from '../../../services/common/publisher.service';
import {UtilsService} from '../../../services/core/utils.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Pagination} from '../../../interfaces/core/pagination';
import {FilterData} from '../../../interfaces/gallery/filter-data';

@Component({
  selector: 'app-publisher-select',
  templateUrl: './publisher-select.component.html',
  styleUrls: ['./publisher-select.component.scss']
})
export class PublisherSelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  // Dynamic Component Data
  @Input('controlName') controlName: FormControl;
  @Input('required') required: boolean = false;
  @Input('placeholder') placeholder: string = 'Select';
  @Input('data') data: Publisher;

  // Store Data
  public dataList: Publisher[] = [];
  public filteredDataList: ReplaySubject<Publisher[]> = new ReplaySubject<Publisher[]>(1);
  searchDataList: Publisher[] = [];

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
    private publisherService: PublisherService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    if (this.controlName) {
      this.selectCtrl = this.controlName;
    } else {
      this.selectCtrl = new FormControl();
    }
    // Default Data
    this.getAllPublisherList();
  }



  ngOnChanges() {
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
              const allPublishers = [...this.searchDataList, ...this.dataList]
              const selectedData = allPublishers.filter(m => {
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
            slug: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: null,
            select: mSelect,
            sort: { createdAt: -1 },
          };

          return this.publisherService.getAllPublisher(filterData, search);
        })
      )
      .subscribe({
        next: res => {
          this.searching = false;
          this.searchDataList = [...this.searchDataList, ...res.data];
          this.filteredDataList.next(res.data);
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
    this.getAllPublisherList();
  }

  /**
   * HTTP REQ HANDLE
   * getAllPublisherList()
   */

  private getAllPublisherList() {

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };


    const pagination: Pagination = {
      pageSize: this.dataPerPage,
      currentPage: this.currentPage - 1
    };

    const filter: FilterData = {
      filter: null,
      pagination: pagination,
      select: mSelect,
      sort: { createdAt: -1 },
    };



    this.publisherService.getAllPublisher(filter, null)
      .subscribe({
        next: res => {
          this.totalData = res.count;
          if (this.selectCtrl.value) {
            const singleArray = [this.selectCtrl.value];
            const allPublishers = [...this.searchDataList, ...this.dataList]
            const selectedData = allPublishers.filter(m => {
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
      const allPublishers = [...this.searchDataList, ...this.dataList]
      const selectedData = allPublishers.filter(m => {
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
   * ON DESTROY
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


}
