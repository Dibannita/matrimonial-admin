import {DiscountPercentService} from './../../../services/common/discount-percent.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators,} from '@angular/forms';
import {DiscountPercent} from 'src/app/interfaces/common/discount-percent.interface';
import {UiService} from '../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {Select} from 'src/app/interfaces/core/select';

interface AccessOption {
  name: string;
  value: boolean;
}

interface GenderOption {
  name: string;
}

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  HasAccessControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );


  deals: Select[] = [
    {value: 'daily deals', viewValue: 'Daily Deals'},
    {value: 'save deals', viewValue: 'Save Deals'},
  ];


  GenderControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  discountPercent?: DiscountPercent;

  // Image Upload
  files: File[] = [];
  pickedImage: any[] = [];
  oldImage: string[] = [];
  removeImage: string;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private discountPercentService: DiscountPercentService,
    private router: Router,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getDiscountPercentById();
      }
    });
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      discountType: [null, Validators.required],
      discountPercent: [null, Validators.required],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.discountPercent);

  }

  onSubmit() {
    if (this.dataForm.invalid) {

      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.discountPercent) {

        this.updateDiscountPercentById();

    } else {

        this.addDiscountPercent();
      }

  }

  /**
   * HTTP REQ HANDLE
   * getDiscountPercentById()
   * addDiscountPercent()
   * updateDiscountPercentById()
   * removeSingleFile()
   */

  private getDiscountPercentById() {
    this.spinnerService.show();
    this.subDataOne = this.discountPercentService.getDiscountPercentById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.discountPercent = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addDiscountPercent() {
    this.spinnerService.show();
    this.subDataTwo = this.discountPercentService.addDiscountPercent(this.dataForm.value).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();

          this.files = [];
        } else {
          this.uiService.warn(res.message);
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private updateDiscountPercentById() {
    this.spinnerService.show();
    this.subDataThree = this.discountPercentService
      .updateDiscountPercentById(this.discountPercent._id, this.dataForm.value)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
        },
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

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }
}
