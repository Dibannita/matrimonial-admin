import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormControl,
  NgForm,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/interfaces/common/category.interface';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../../services/core/storage.service';
import { ProductService } from '../../../../services/common/product.service';
import { UiService } from '../../../../services/core/ui.service';
import { Product } from '../../../../interfaces/common/product.interface';
import { SubCategory } from 'src/app/interfaces/common/sub-category.interface';
import { Tag } from 'src/app/interfaces/common/tag.interface';
import { TagService } from 'src/app/services/common/tag.service';
import { UtilsService } from 'src/app/services/core/utils.service';
import { Gallery } from 'src/app/interfaces/gallery/gallery.interface';
import { AllImagesDialogComponent } from 'src/app/pages/gallery/images/all-images-dialog/all-images-dialog.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  // Ngx Quill
  modules: any = null;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;

  // Form Array
  specificationDataArray?: FormArray;
  featuresDataArray?: FormArray;
  selectEdittedAdress: any = null;
  isSelected = false;

  // Infinity Select
  categoryCtrl: FormControl = new FormControl();
  subCategoryCtrl: FormControl = new FormControl();
  childCategoryCtrl: FormControl = new FormControl();
  authorCtrl: FormControl = new FormControl();
  brandCtrl: FormControl = new FormControl();
  publisherCtrl: FormControl = new FormControl();

  // Store Data
  tags: Tag[] = [];

  postType: string = 'job_post';
  selectedCategory: Category = null;
  selectedSubCategory: SubCategory = null;

  // Image
  files: File[] = [];
  pickedImage: any[] = [];
  oldImages: string[] = [];
  removeImages: string[] = [];
  chooseImage?: string[] = [];
  autoSlug = true;

  id: string;
  private product: Product;
  dataForm: FormGroup;
  isLoader: boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;
  private productAutoSlug: Subscription;
  private subDivisionData: Subscription;
  private subAreaData: Subscription;
  private subZoneData: Subscription;
  private subReload: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private tagService: TagService,
    private dialog: MatDialog,
    private fileUploadService: FileUploadService,
    private utilsService: UtilsService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.initialForm();
    this.subDataOne = this.activatedRoute.queryParamMap.subscribe(
      (qParamMap) => {
        this.id = qParamMap.get('id');
        if (this.id) {
          this.getProductById();
        } else {
          this.setData();
        }
      }
    );
    this.autoGenerateSlug();
  }

  /**
   * FORM METHODS
   * initialForm()
   * setData()
   * setFormData()
   * onFormSubmit()
   * onGoBack()
   */

  initialForm() {
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      relationshipGuardian: ['', Validators.required],
      guardianNumber: [null, Validators.required],
      receiveBiodata: ['', Validators.required],
      slug: [null],
      images: [null],
    });
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage(
      'MATRIMONIAL_GENERAL_CONTACT'
    );
    if (data) {
      this.dataForm.setValue(data);
    }
  }

  private setFormData() {
    if (this.product) {
      this.dataForm.patchValue(this.product);
    }
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;

      if (this.id) {
        this.updateProductByUser();
      } else {
        this.storageService.storeDataToSessionStorage(
          'MATRIMONIAL_GENERAL_CONTACT',
          this.dataForm.value
        );
        const general = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_INPUT'
        );
        const address = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_ADDRESS'
        );
        const education = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_EDUCATION'
        );
        const family = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_FAMILY'
        );
        const partner = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_PARTNER'
        );
        const pledge = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_PLEDGE'
        );
        const marriage = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_MARRIAGE'
        );
        const contact = this.storageService.getDataFromSessionStorage(
          'MATRIMONIAL_GENERAL_CONTACT'
        );

        const finalData = {
          ...general,
          ...address,
          ...education,
          ...family,
          ...partner,
          ...pledge,
          ...marriage,
          ...contact,
          ...{
            postType: 'matrimonial',
            status: 'publish',
          },
        };
        if (this.id) {
          this.updateProductByUser();
        } else {
          this.addProduct(finalData);
        }
      }
    }
    const mData = {
      ...this.dataForm.value,
    };

    // Main Function
    if (this.product) {
      this.updateProductById(mData);
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  // For form back button
  onGoBack() {
    history.back();
  }

  /**
   * HTTP REQ HANDLE
   * getProductById()
   * addProduct()
   * updateProductByUser()
   */
  private getProductById() {
    const select =
      'name relationshipGuardian guardianNumber receiveBiodata slug';
    this.subDataOne = this.productService
      .getProductById(this.id, select)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.product = res.data;
            this.setFormData();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private addProduct(data: any) {
    this.subDataTwo = this.productService.addProduct(data).subscribe(
      (res) => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoader = false;
          // this.router.navigate(['/account/orders'])
        }
      },
      (err) => {
        this.isLoader = false;
        this.uiService.wrong('Something went wrong!');
        console.log(err);
      }
    );
  }
  private deleteMultipleFile(data: string[]) {
    this.subDataFive = this.fileUploadService
      .deleteMultipleFile(data)
      .subscribe({
        next: (res) => {},
        error: (error) => {
          console.log(error);
        },
      });
  }
  private updateProductById(data: any) {
    this.spinnerService.show();
    this.subDataFour = this.productService
      .updateProductById(this.product._id, data)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);

            // Remove Old Image from Backend
            if (this.removeImages && this.removeImages.length) {
              this.deleteMultipleFile(this.removeImages);
            }
            this.files = [];
            this.oldImages = [];
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
  private updateProductByUser() {
    this.subDataThree = this.productService
      .updateProductById(this.id, this.dataForm.value)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.success(res.message);
            this.isLoader = false;
            // this.router.navigate(['/account/orders']);
          }
        },
        error: (err) => {
          this.isLoader = false;
          console.log(err);
        },
      });
  }

  /**
   * IMAGE UPLOAD
   * onSelect()
   * patchPickedImagesUnique()
   * drop()
   * onRemove()
   * removeSelectImage()
   */

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }

  private patchPickedImagesUnique(images: Gallery[]) {
    if (this.chooseImage && this.chooseImage.length > 0) {
      const nImages = images.map((m) => m.url);
      this.chooseImage = this.utilsService.mergeArrayString(
        nImages,
        this.chooseImage
      );
    } else {
      this.chooseImage = images.map((m) => m.url);
    }
    this.dataForm.patchValue({ images: this.chooseImage });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chooseImage, event.previousIndex, event.currentIndex);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  removeSelectImage(s: string) {
    const index = this.chooseImage.findIndex((x) => x === s);
    this.chooseImage.splice(index, 1);
  }

  /**
   * ON CATEGORY SELECT
   * onCategorySelect()
   * getEmiInput()
   */
  onCategorySelect(data: Category) {
    if (data) {
      this.selectedCategory = data;
    }
  }

  onSubCategorySelect(data: SubCategory) {
    // console.log('data', data)
    if (data) {
      this.selectedSubCategory = data;
    }
  }

  getEmiInput(value: number) {
    if (this.dataForm.value.emiMonth && this.dataForm.value.emiMonth.length) {
      const fIndex = this.dataForm.value.emiMonth.findIndex((f) => f == value);
      if (fIndex > -1) {
        return value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * OPEN COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog() {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {
        type: 'multiple',
        count: this.chooseImage.length ? 10 - this.chooseImage.length : 10,
      },
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.patchPickedImagesUnique(dialogResult.data);
        }
      }
    });
  }

  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.productAutoSlug = this.dataForm
        .get('name')
        .valueChanges.pipe()
        .subscribe((d) => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res,
          });
        });
    } else {
      if (!this.productAutoSlug) {
        return;
      }
      this.productAutoSlug?.unsubscribe();
    }
  }

  /**
   * On Destroy
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

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.productAutoSlug) {
      this.productAutoSlug.unsubscribe();
    }
  }
}
