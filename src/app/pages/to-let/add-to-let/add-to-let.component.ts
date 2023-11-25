import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators,} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {Category} from 'src/app/interfaces/common/category.interface';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {DISCOUNT_TYPES, EMI_MONTHS, PRODUCT_STATUS,} from '../../../core/utils/app-data';
import {Product} from '../../../interfaces/common/product.interface';
import {Tag} from '../../../interfaces/common/tag.interface';
import {FilterData} from '../../../interfaces/core/filter-data';
import {Select} from '../../../interfaces/core/select';
import {Gallery} from '../../../interfaces/gallery/gallery.interface';
import {ProductService} from '../../../services/common/product.service';
import {TagService} from '../../../services/common/tag.service';
import {UiService} from '../../../services/core/ui.service';
import {UtilsService} from '../../../services/core/utils.service';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Area} from '../../../interfaces/common/area.interface';
import {AreaService} from '../../../services/common/area.service';
import {SubCategory} from 'src/app/interfaces/common/sub-category.interface';
import {JobType} from "../../../interfaces/common/jobType.interface";
import {JobTypeService} from "../../../services/common/jobType.service";
import {Division} from "../../../interfaces/common/division.interface";
import {Zone} from "../../../interfaces/common/zone.interface";
import {DivisionService} from "../../../services/common/division.service";
import {ZoneService} from "../../../services/common/zone.service";

@Component({
  selector: 'app-add-to-let',
  templateUrl: './add-to-let.component.html',
  styleUrls: ['./add-to-let.component.scss']
})
export class AddToLetComponent implements OnInit {


  // Ngx Quill
  modules: any = null;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

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
  id?: string;
  product?: Product;
  postType: string = 'job_post'
  selectedCategory: Category = null;
  selectedSubCategory: SubCategory = null;
  autoSlug = true;

  // Image
  files: File[] = [];
  pickedImage: any[] = [];
  oldImages: string[] = [];
  removeImages: string[] = [];
  chooseImage?: string[] = [];
  jobTypes: JobType[] = [];
  // Static Data
  productStatus: Select[] = PRODUCT_STATUS;
  emiMonths: Select[] = EMI_MONTHS;
  discountTypes: Select[] = DISCOUNT_TYPES;

  divisions: Division[] = [];
  area: Area[] = [];
  zone: Zone[] = [];

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
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private tagService: TagService,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
    private utilsService: UtilsService,
    private jobTypeService: JobTypeService,
    private divisionService: DivisionService,
    private areaService: AreaService,
    private zoneService: ZoneService,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();
    this.getAllDivision();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getProductById();
      }
    });

    // Base Data
    this.getAllTags();
    // this.getAllAreas();
    this.getAllJobType();
    // Auto Slug
    this.autoGenerateSlug();
  }

  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.productAutoSlug = this.dataForm.get('name').valueChanges
        .pipe(
        ).subscribe(d => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res
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
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onAddNewSpecifications()
   * removeFormArrayField()
   * clearFormArray()
   * findInvalidControls()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      slug: [null],
      bedroom: [null, Validators.required],
      bathroom: [null],
      balcony: [null],
      floorNo: [null],
      availableFrom: [null],
      flatCategory: [null],
      flatType: [null],
      division: [null],
      area: [null],
      zone: [null],
      images: [null],
      address: [null, Validators.required],
      description: [null],
      rentPrice: [null],
      postType: 'to_let',


      status: [this.productStatus[1].value, Validators.required],

      specifications: this.fb.array([]),
      features: this.fb.array([]),
      // Variations
      hasVariations: [null],
    });
    this.specificationDataArray = this.dataForm.get(
      'specifications'
    ) as FormArray;
    this.featuresDataArray = this.dataForm.get(
      'features'
    ) as FormArray;
  }

  private setFormValue() {

    if (this.product) {
      this.dataForm.patchValue({
        ...this.product,
        ...{
          division: this.product.division._id,
          area: this.product.area._id,
          zone: this.product.zone._id,
        }
      });
    }

    // Set Image
    if (this.product.images && this.product.images.length) {
      this.chooseImage = this.product.images;
    }

    // Get Sub Category By Category
    if (this.product.division) {
      this.getAllArea(this.product.division._id);
    }

    if (this.product.area) {
      this.getAllZone(this.product.area._id);
    }

    // this.dataForm.patchValue({division: this.selectEdittedAdress?.division?._id});
    // this.dataForm.patchValue({area: this.selectEdittedAdress?.area?._id});
    // this.dataForm.patchValue({zone: this.selectEdittedAdress?.zone?._id});
    // this.getAllArea(this.dataForm.get('division')?.value);
    // this.getAllZone(this.dataForm.get('area')?.value);

  }

  onAddNewSpecifications() {
    const f = this.fb.group({
      name: [null],
      value: [null],
      type: [this.dataForm.value.specifications.length ? this.dataForm.value.specifications[this.dataForm.value.specifications.length - 1].type : null, Validators.required],
    });
    (this.dataForm?.get('specifications') as FormArray).push(f);
  }

  onAddNewFeatures() {
    const f = this.fb.group({
      name: [null],
      value: [null],
    });
    (this.dataForm?.get('features') as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'specifications': {
        formDataArray = this.specificationDataArray;
        break;
      }

      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }

  removeFeaturesFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'features': {
        formDataArray = this.featuresDataArray;
        break;
      }

      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }


  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }


    if (this.dataForm.valid) {
      let selectDivision = this.divisions.find((d) => d._id === this.dataForm.value.division);
      let selectArea = this.area.find((d) => d._id === this.dataForm.value.area);
      let selectZone = this.zone.find((d) => d._id === this.dataForm.value.zone);
      const mData = {
        ...this.dataForm.value,
        ...{division: selectDivision},
        ...{area: selectArea},
        ...{zone: selectZone},
      }

      // Main Function
      if (this.product) {

        this.updateProductById(mData);

      } else {

        this.addProduct(mData);

      }

    }


  }


  onChangeRegion(event: any) {
    if (event) {
      this.getAllArea(this.dataForm.get('division')?.value);
    }
  }

  onChangeArea(event: any) {
    if (event) {
      this.getAllZone(this.dataForm.get('area')?.value);
    }
  }


  /**
   * HTTP REQ HANDLE
   * getAllTags()
   getProductById()
   * addProduct()
   * updateProductById()
   * deleteMultipleFile()
   */



  private getAllDivision() {
    let mSelect = {
      name: 1,
    }
    const filter: FilterData = {
      filter: {status: 'publish'},
      select: mSelect,
      pagination: null,
      sort: {createdAt: -1}
    }

    this.subDivisionData = this.divisionService.getAllDivisions(filter).subscribe(
      (res) => {
        if (res.success) {
          this.divisions = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getAllArea(id: string) {


    const select = 'name';
    this.subAreaData = this.areaService.getAreaByParentId(id, select).subscribe(
      (res) => {
        if (res.success) {
          this.area = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  private getAllZone(id: string) {
    console.log("id", id)
    const select = 'name';
    this.subZoneData = this.zoneService.getZoneByParentId(id, select).subscribe(
      (res) => {
        if (res.success) {
          this.zone = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  private getAllTags() {
    // Select
    const mSelect = {
      name: 1,
      nameBn: 1,
      nameIt: 1,
      slug: 1,
    };

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataOne = this.tagService.getAllTag(filterData, null).subscribe({
      next: res => {
        this.tags = res.data;

      },
      error: error => {
        console.log(error);
      }
    });
  }

  private getAllJobType() {
    // Select
    const mSelect = {
      image: 1,
      name: 1,
      createdAt: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    this.subDataOne = this.jobTypeService.getAllJobType(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.jobTypes = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  private getProductById() {
    this.spinnerService.show();
    this.subDataThree = this.productService.getProductById(this.id).subscribe({
      next: res => {
        this.spinnerService.hide();
        if (res.success) {
          this.product = res.data;
          this.setFormValue();
        }
      },
      error: error => {
        this.spinnerService.hide();
        console.log(error);
      }

    })

  }

  private addProduct(data: any) {
    this.spinnerService.show();
    this.subDataTwo = this.productService.addProduct(data).subscribe({
      next: res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
        } else {
          this.uiService.warn(res.message);
        }
      },
      error: error => {
        this.spinnerService.hide();
        console.log(error);
      }
    });
  }

  private updateProductById(data: any) {
    this.spinnerService.show();
    this.subDataFour = this.productService
      .updateProductById(this.product._id, data)
      .subscribe({
        next: res => {
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
        error: error => {
          this.spinnerService.hide();
          console.log(error);
        }
      });

  }


  private deleteMultipleFile(data: string[]) {
    this.subDataFive = this.fileUploadService.deleteMultipleFile(data).subscribe({
      next: (res) => {

      },
      error: (error) => {
        console.log(error);
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
      const nImages = images.map(m => m.url);
      this.chooseImage = this.utilsService.mergeArrayString(nImages, this.chooseImage);
    } else {
      this.chooseImage = images.map(m => m.url);
    }
    this.dataForm.patchValue(
      {images: this.chooseImage}
    );
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chooseImage, event.previousIndex, event.currentIndex);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  removeSelectImage(s: string) {
    const index = this.chooseImage.findIndex(x => x === s);
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
      const fIndex = this.dataForm.value.emiMonth.findIndex(f => f == value)
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
      data: {type: 'multiple', count: this.chooseImage.length ? (10 - this.chooseImage.length) : 10},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.patchPickedImagesUnique(dialogResult.data);
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
