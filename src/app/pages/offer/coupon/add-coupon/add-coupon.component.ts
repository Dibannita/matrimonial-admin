import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CouponService} from '../../../../services/common/coupon.service';
import {Coupon} from '../../../../interfaces/common/coupon.interface';
import {Category} from '../../../../interfaces/common/category.interface';
import {CategoryService} from '../../../../services/common/category.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {defaultUploadImage, DISCOUNT_TYPES} from '../../../../core/utils/app-data';
import {MatDialog} from '@angular/material/dialog';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {Select} from '../../../../interfaces/core/select';
import {AllImagesDialogComponent} from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
})
export class AddCouponComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Ngx Quill
  modules: any = null;

  // Store Data
  id?: string;
  coupon?: Coupon;
  categories: Category[] = [];

  // Static Data
  discountTypes: Select[] = DISCOUNT_TYPES;

  // Image Picker
  pickedImage = defaultUploadImage;
  pickedMobileImage = defaultUploadImage;

  // Subscriptions

  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private couponService: CouponService,
    private categoryService: CategoryService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initQuillModule();
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getCouponById();
      }
    });

    // Base Data
    this.getAllCategories();
  }

  /**
   * QUILL CONFIG
   * initQuillModule()
   */
  private initQuillModule() {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{header: 1}, {header: 2}], // custom button values
          [{list: 'ordered'}, {list: 'bullet'}],
          [{script: 'sub'}, {script: 'super'}], // superscript/subscript
          [{indent: '-1'}, {indent: '+1'}], // outdent/indent
          [{direction: 'rtl'}], // text direction

          [{size: ['small', false, 'large', 'huge']}], // custom dropdown
          [{header: [1, 2, 3, 4, 5, 6, false]}],

          [{color: []}, {background: []}], // dropdown with defaults from theme
          [{font: []}],
          [{align: []}],

          ['clean'], // remove formatting button

          ['link', 'image', 'video'], // link and image, video
          ['emoji'],
        ],
      },
    };
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      discountType: [null, Validators.required],
      discountAmount: [null, Validators.required],
      minimumAmount: [null, Validators.required],
      bannerImage: [null],
      couponCode: [null],
      description: [null],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.coupon);

    if (this.coupon && this.coupon.bannerImage) {
      this.pickedImage = this.coupon.bannerImage;
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.coupon) {

      this.updateCouponById();

    } else {

      this.addCoupon();

    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllCategories()
   * getCouponById()
   * addCoupon()
   * updateCouponById()
   */


  private getAllCategories() {
    this.spinnerService.show();
    // Select
    const mSelect = {
      name: 1,
    };

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1},
    };
    this.subDataFour = this.categoryService
      .getAllCategory(filterData, null)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          this.categories = res.data;
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private getCouponById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.couponService.getCouponById(this.id).subscribe({
      next: (res => {
        this.spinnerService.hide();
        if (res.success) {
          this.coupon = res.data;
          this.setFormValue();
        }
      }),
      error: (error => {
        this.spinnerService.hide();
        console.log(error);
      })
    });
  }

  private addCoupon() {
    this.spinnerService.show();

    this.subDataOne = this.couponService
      .addCoupon(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
            this.pickedImage = defaultUploadImage;

          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private updateCouponById() {
    this.spinnerService.show();
    this.subDataThree = this.couponService
      .updateCouponById(this.coupon._id, this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {

            this.uiService.success(res.message);


          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }


  /**
   * COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog(type: 'image' | 'mobileImage') {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          const image: Gallery = dialogResult.data[0] as Gallery;
          if (type === 'mobileImage') {
            this.dataForm.patchValue({mobileImage: image.url});
            this.pickedMobileImage = image.url;
          } else {
            this.dataForm.patchValue({bannerImage: image.url});
            this.pickedImage = image.url;
          }
        }
      }
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
  }
}
