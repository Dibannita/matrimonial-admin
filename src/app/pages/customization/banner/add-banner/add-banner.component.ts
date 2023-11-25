import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Banner} from 'src/app/interfaces/common/banner.interface';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BannerService} from '../../../../services/common/banner.service';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {Select} from 'src/app/interfaces/core/select';
import {MatDialog} from '@angular/material/dialog';
import {AllImagesDialogComponent} from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {defaultUploadImage} from '../../../../core/utils/app-data';


interface AccessOption {
  name: string;
  value: boolean;
}


@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
})
export class AddBannerComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  banner?: Banner;
  autoSlug = true;


  bannerTypeControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );

  bannerTypeAccess: Select[] = [
    {value: 'category', viewValue: 'Category Banner'},
    {value: 'categoryTwo', viewValue: 'Category Banner Two'},
    {value: 'hotsale', viewValue: 'Hotsale Banner'},
    {value: 'productOne', viewValue: 'Product Banner One'},
    {value: 'productTwo', viewValue: 'Product Banner Two'},
    {value: 'productThree', viewValue: 'Product Banner Three'},
    {value: 'productFour', viewValue: 'Product Banner Four'},
    {value: 'homePageTopBigBanner', viewValue: 'Home Page Top Big Banner'},
    {value: 'homePageTopSmallBanner', viewValue: 'Home Page Top Small Banner'},

  ];


  // Image Upload
  files: File[] = [];



  // Image Picker
  pickedImage = defaultUploadImage;
  pickedMobileImage = defaultUploadImage;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private bannerService: BannerService,
    private router: Router,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getBannerById();
      }
    });

     // Auto Slug
     this.autoGenerateSlug();
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null],
      slug: [null],
      priority: [null],
      image: [null],
      mobileImage: [null],
      bannerType: [null],
      url: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.banner);
    if (this.banner && this.banner.image) {
      this.pickedImage = this.banner.image;

    }
    if (this.banner && this.banner.mobileImage) {
      this.pickedMobileImage = this.banner.mobileImage;
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (!this.banner) {
      this.addBanner();
    } else {
      this.updateBannerById();
    }
  }

  /**
   * HTTP REQ HANDLE
   * getBannerById()
   * addBanner()
   * updateBannerById()
   */

  private getBannerById() {
    this.spinnerService.show();
    this.subDataOne = this.bannerService.getBannerById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.banner = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addBanner() {
    this.spinnerService.show();
    this.subDataTwo = this.bannerService
      .addBanner(this.dataForm.value)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
            this.pickedImage = defaultUploadImage;
            this.pickedMobileImage = defaultUploadImage;
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

  private updateBannerById() {
    this.spinnerService.show();
    this.subDataThree = this.bannerService
      .updateBannerById(this.banner._id, this.dataForm.value)
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
   * LOGICAL PART
   * autoGenerateSlug()
   */
    autoGenerateSlug() {
      if (this.autoSlug === true) {
        this.subAutoSlug = this.dataForm.get('name').valueChanges
          .pipe(
            // debounceTime(200),
            // distinctUntilChanged()
          ).subscribe(d => {
            const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
            this.dataForm.patchValue({
              slug: res
            });
          });
      } else {
        if (!this.subAutoSlug) {
          return;
        }
        this.subAutoSlug?.unsubscribe();
      }
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
            this.dataForm.patchValue({image: image.url});
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

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }
}
