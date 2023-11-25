import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Customer} from '../../../interfaces/common/customer.interface';
import {NgForm} from '@angular/forms';
import {debounceTime, distinctUntilChanged, EMPTY, pluck, Subscription, switchMap} from 'rxjs';
import {FilterData} from '../../../interfaces/gallery/filter-data';
import {VendorService} from '../../../services/common/vendor.service';
import {Vendor} from '../../../interfaces/common/vendor.interface';

@Component({
  selector: 'app-vendor-search-field',
  templateUrl: './vendor-search-field.component.html',
  styleUrls: ['./vendor-search-field.component.scss']
})
export class VendorSearchFieldComponent implements OnInit, AfterViewInit {

  @Input() vendor: Vendor;
  @Output() onSelect = new EventEmitter<Customer>();

  // Store data
  vendors?: Vendor[] = [];
  totalVendors: number = 0;

  // SEARCH AREA
  overlay = false;
  isOpen = false;
  isFocused = false;
  isLoading = false;
  searchVendors: Vendor[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Subscriptions
  private subForm: Subscription;

  constructor(
    private vendorService: VendorService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue.pipe(
      // map(t => t.searchTerm)
      // filter(() => this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(data => {
        this.searchQuery = data;
        if (this.searchQuery === '' || this.searchQuery === null) {
          this.overlay = false;
          this.searchVendors = [];
          this.totalVendors = 0;
          this.searchQuery = null;
          return EMPTY;
        }

        // Select
        const mSelect = {
          name: 1,
          phone: 1,
        }

        const filterData: FilterData = {
          pagination: null,
          filter: null,
          select: mSelect,
          sort: {createdAt: -1}
        }

        return this.vendorService.getAllVendors(filterData, this.searchQuery);
      })
    )
      .subscribe({
        next: res => {
          this.searchVendors = res.data;
          this.vendors = this.searchVendors;
          this.totalVendors = res.count;
          if (this.searchVendors.length > 0) {
            this.isOpen = true;
            this.overlay = true;
          }
        },
        error: error => {
          console.log(error)
        }
      })
  }


  /**
   * HANDLE SEARCH Area
   * onClickHeader()
   * onClickSearchArea()
   * handleOverlay()
   * handleFocus()
   * setPanelState()
   * handleOpen()
   * handleOutsideClick()
   * handleCloseOnly()
   * handleCloseAndClear()
   * onSelectItem()
   */


  onClickHeader(): void {
    this.handleCloseOnly();
  }

  onClickSearchArea(event: MouseEvent): void {
    event.stopPropagation();
  }

  handleOverlay(): void {
    this.overlay = false;
    this.isOpen = false;
    this.isFocused = false;
  }

  handleFocus(event: FocusEvent): void {
    this.searchInput.nativeElement.focus();

    if (this.isFocused) {
      return;
    }
    if (this.searchVendors.length > 0) {
      this.setPanelState(event);
    }
    this.isFocused = true;
  }

  private setPanelState(event: FocusEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = false;
    this.handleOpen();
  }

  handleOpen(): void {
    if (this.isOpen || this.isOpen && !this.isLoading) {
      return;
    }
    if (this.searchVendors.length > 0) {
      this.isOpen = true;
      this.overlay = true;
    }
  }

  handleOutsideClick(): void {
    if (!this.isOpen) {
      // this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.isFocused = false;
  }

  handleCloseOnly(): void {
    if (!this.isOpen) {
      this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.isFocused = false;
  }

  handleCloseAndClear(): void {
    if (!this.isOpen) {
      this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.searchVendors = [];
    this.isFocused = false;
  }

  onSelectItem(data: Customer): void {
    this.handleCloseAndClear();
    this.searchForm.resetForm();
    this.onSelect.emit(data);
  }


}
