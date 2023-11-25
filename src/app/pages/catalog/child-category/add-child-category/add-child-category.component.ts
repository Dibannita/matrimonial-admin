import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Category} from '../../../../interfaces/common/category.interface';
import {CategoryService} from '../../../../services/common/category.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {defaultUploadImage} from '../../../../core/utils/app-data';
import { AllImagesDialogComponent } from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {ChildCategory} from '../../../../interfaces/common/child-category.interface';
import {ChildCategoryService} from '../../../../services/common/child-category.service';
import {SubCategoryService} from '../../../../services/common/sub-category.service';
import {SubCategory} from '../../../../interfaces/common/sub-category.interface';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-child-category.component.html',
  styleUrls: ['./add-child-category.component.scss']
})
export class AddChildCategoryComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  subCategory?: SubCategory;
  childCategory?: ChildCategory;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private childCategoryService: ChildCategoryService,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getChildCategoryById();
      }
    });

    // Base Data
    this.getAllCategories();
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
      image: [null],
      priority: [null],
      category: [null, Validators.required],
      subCategory: [null, Validators.required]
    });
  }
  private setFormValue() {
    if (this.childCategory && this.childCategory.image) {
      this.pickedImage = this.childCategory.image;
    }
    this.dataForm.patchValue({
        ...this.childCategory,
        ...{
          category: this.childCategory.category._id,
          subCategory: this.childCategory.subCategory._id,
        }
      }
    );

    // Get Sub Child Category By Sub Category
    if (this.childCategory.subCategory) {
      this.getSubCategoriesByCategoryId(this.childCategory.category._id);
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    const mData = {
      ...this.dataForm.value,
      ...{
        category: {
          _id: this.dataForm.value.category,
          name: this.categories.find(f => f._id === this.dataForm.value.category).name,
          slug: this.categories.find(f => f._id === this.dataForm.value.category).slug,
        },
        subCategory: {
          _id: this.dataForm.value.subCategory,
          name: this.subCategories.find(f => f._id === this.dataForm.value.subCategory).name,
          slug: this.subCategories.find(f => f._id === this.dataForm.value.subCategory).slug,
        }
      }
    }

    if (this.childCategory) {
      this.updateChildCategoryById(mData);
    } else {
      this.addChildCategory(mData);

    }

  }


   /**
   * HTTP REQ HANDLE
   * getAllCategories
   * getChildCategoryById
   * addChildCategory
   * updateChildCategoryById
   */
    private getAllCategories() {
      this.spinnerService.show();
      // Select
      const mSelect = {
        name: 1,
        slug: 1,
      }

      const filterData: FilterData = {
        pagination: null,
        filter: null,
        select: mSelect,
        sort: {name: 1}
      }
      this.subDataFour = this.categoryService.getAllCategory(filterData, null)
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

  private getSubCategoriesByCategoryId(categoryId: string) {
    const select = 'name slug'
    this.subDataThree = this.subCategoryService.getSubCategoriesByCategoryId(categoryId, select)
      .subscribe(res => {
        this.subCategories = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getChildCategoryById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.childCategoryService.getChildCategoryById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.childCategory = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }


    private addChildCategory(data: any) {
      this.spinnerService.show();

      this.subDataOne = this.childCategoryService.addChildCategory(data)
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
    private updateChildCategoryById(data: any) {
      this.spinnerService.show();
      this.subDataThree = this.childCategoryService.updateChildCategoryById(this.childCategory._id, data)
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
   * openGalleryDialog
   */

  public openGalleryDialog() {
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
          this.dataForm.patchValue({image: image.url});
          this.pickedImage = image.url;
        }
      }
    });
  }

  /**
   * ON SELECTION CHANGE
   * onCategoryChange()
   */

  onCategorySelect(event: MatSelectChange) {
    console.log('event.value', event.value)
    if (event.value) {
      this.getSubCategoriesByCategoryId(event.value);
    }
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
