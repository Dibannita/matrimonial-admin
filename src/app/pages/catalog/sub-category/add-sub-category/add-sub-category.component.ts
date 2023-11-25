import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SubCategory } from 'src/app/interfaces/common/sub-category.interface';
import { FilterData } from 'src/app/interfaces/gallery/filter-data';
import { CategoryService } from 'src/app/services/common/category.service';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import {defaultUploadImage, POSTTYPE} from '../../../../core/utils/app-data';
import { Gallery } from '../../../../interfaces/gallery/gallery.interface';
import { SubCategoryService } from '../../../../services/common/sub-category.service';
import { UiService } from '../../../../services/core/ui.service';
import { AllImagesDialogComponent } from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Select} from "../../../../interfaces/core/select";


interface AccessOption {
  name: string;
  value: boolean;
}

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss'],
})
export class AddSubCategoryComponent implements OnInit {

  PostTypeControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );
  postTypes: Select[] = POSTTYPE;

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  subCategory?: SubCategory;
  categoryCount: any;
  subCategoryy: any;
  holdPrevData: any;
  filter: any;
  autoSlug = true;


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
    private subCategoryService: SubCategoryService,
    private router: Router,
    private fileUploadService: FileUploadService,
    private categoryService: CategoryService,
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
        this.getSubCategoryById();
      }
    });

    // Auto Slug
    this.autoGenerateSlug();
    this.getAllCategory();
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
      category: [null],
      image: [null],
      postType: [null],
      status: ['publish'],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.subCategory);
    if (this.subCategory && this.subCategory.image) {
      this.pickedImage = this.subCategory.image;
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (!this.subCategory) {
      this.addSubCategory()
    } else {
      this.updateSubCategoryById()
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllCategory()
   * getSubCategoryById()
   * addSubCategory()
   * updateSubCategoryById()
   */
  private getAllCategory() {
    // Select
    const mSelect = {
      name: 1,
      nameBn: 1,
      nameIt: 1,
      image: 1,
      slug: 1,
      createdAt: 1,
      serial: 1,
      status: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.categoryService
      .getAllCategory(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.subCategoryy = res.data;
            this.categoryCount = res.count;
            this.holdPrevData = this.subCategoryy;
            // this.totalCategorysStore = this.categoryCount;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getSubCategoryById() {
    this.spinnerService.show();
    this.subDataOne = this.subCategoryService
      .getSubCategoryById(this.id)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.data) {
            this.subCategory = res.data;

            this.setFormValue();
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
        },
      });
  }

  private addSubCategory() {
    this.spinnerService.show();
    this.subDataTwo = this.subCategoryService
      .addSubCategory(this.dataForm.value)
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

  private updateSubCategoryById() {
    this.spinnerService.show();
    this.subDataThree = this.subCategoryService
      .updateSubCategoryById(this.subCategory._id, this.dataForm.value)
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
      data: { type: 'single', count: 1 },
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
            this.dataForm.patchValue({ mobileImage: image.url });
            this.pickedMobileImage = image.url;
          } else {
            this.dataForm.patchValue({ image: image.url });
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
    if (this.subAutoSlug) {
      this.subAutoSlug.unsubscribe();
    }
  }

  protected readonly POSTTYPE = POSTTYPE;
}
