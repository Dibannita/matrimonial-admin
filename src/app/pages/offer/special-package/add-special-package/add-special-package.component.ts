import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { defaultUploadImage } from '../../../../core/utils/app-data';
import { Product } from '../../../../interfaces/common/product.interface';
import { ProductListComponent } from '../../../../shared/dialog-view/product-list/product-list.component';
import { UiService } from '../../../../services/core/ui.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../../services/core/utils.service';
import { Subscription } from 'rxjs';
import { Gallery } from '../../../../interfaces/gallery/gallery.interface';
import { SpecialPackageService } from '../../../../services/common/special-package.service';
import { SpecialPackage, Package_Items } from '../../../../interfaces/common/special-package.interface';
import { DiscountTypeEnum } from '../../../../enum/product.enum';
import { Select } from 'src/app/interfaces/core/select';
import { ConfirmDialogComponent } from 'src/app/shared/components/ui/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogWithCheckComponent } from 'src/app/shared/components/ui/confirm-dialog-with-check/confirm-dialog-with-check.component';
import { AllImagesDialogComponent } from 'src/app/pages/gallery/images/all-images-dialog/all-images-dialog.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-special-package.component.html',
  styleUrls: ['./add-special-package.component.scss'],
})
export class AddSpecialPackageComponent implements OnInit, OnDestroy {

  discountType: Select[] = [
    {
      value: 1,
      viewValue: 'Percentage'
    },
    {
      value: 2,
      viewValue: 'Cash'
    },
  ];

  // Selected Product Total Amount
  totalAmount = 0;
  // Image Picker
  pickedImage = defaultUploadImage;

  // Store Data
  id?: string;
  viewOnly?: boolean;
  specialOffer?: SpecialPackage;
  package_Items?: Package_Items[];
  selectedProducts: Product[] = [];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subRouteTwo: Subscription;


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private uiService: UiService,
    private specialOfferService: SpecialPackageService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();


    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getSpecialPackageById();
      }
      // GET PAGE FROM QUERY PARAM
      this.subRouteTwo = this.activatedRoute.queryParams.subscribe(qParam => {
        if (qParam && qParam['productDialog']) {
          this.openProductListDialog()
        }
        this.viewOnly = qParam && qParam['viewOnly'] && qParam['viewOnly'] === 'yes';
      });
    });
  }


  /**
   * FORM METHODS
   * initDataForm()
   * setDataForm()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      image: [null],
      discountType: [null],
      discountAmount: [0],
    });
  }

  private setDataForm() {
    if (this.specialOffer) {
      this.dataForm.patchValue(this.specialOffer);
      this.selectedProducts = (this.specialOffer.products as Product[])
      this.countTotal()

      if (this.specialOffer.image) {
        this.pickedImage = this.specialOffer.image
      }
    }
  }

  onSubmit() {
    console.log('Add Data', this.dataForm.value)
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      this.dataForm.markAllAsTouched();
      return;
    }

    if (!this.selectedProducts.length) {
      this.uiService.warn('Please select product')
      return;
    }

    const mData = {
      ...this.dataForm.value,
      ...{
        salePrice: this.totalAmount,
        products: this.selectedProducts.map(m => {
          return {
            product: m._id,
            hasVariations: m.hasVariations ? m.hasVariations : null,
            quantity: m.quantity,
            selectedVariation: m.selectedVariation ? m.selectedVariation._id : null,
          }
        })
      }
    }


    if (this.id) {
      this.updateSpecialPackageById(mData)
    } else {
      this.addSpecialPackage(mData);
    }

  }


  /**
   * ACTION
   * removeProduct()
   */
  removeProduct(i: number) {
    this.selectedProducts.splice(i, 1);
    this.dataForm.patchValue({ products: this.selectedProducts.map(m => m._id) })
    this.countTotal()
  }

  /**
   * HTTP REQ HANDLE
   * addSpecialPackage()
   * getSpecialPackageById()
   * updateSpecialPackageById()
   */
  private addSpecialPackage(data: any) {
    this.spinnerService.show();
    this.subDataOne = this.specialOfferService.addSpecialPackage(data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.resetValue();
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error)
      })
  }

  private getSpecialPackageById() {
    this.spinnerService.show();
    this.subRouteTwo = this.specialOfferService.getSpecialPackageById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.specialOffer = res.data;
          this.setDataForm();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error)
      })
  }

  private updateSpecialPackageById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.specialOfferService.updateSpecialPackageById(this.specialOffer._id, data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  /**
   * RESET VALUE
   */
  private resetValue() {
    this.formElement.resetForm();
    this.selectedProducts = [];
  }


  /**
   * OPEN COMPONENT DIALOG
   * openGalleryDialog()
   * openProductListDialog()
   */

  public openGalleryDialog() {
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
          this.dataForm.patchValue({ image: image.url });
          this.pickedImage = image.url;
        }
      }
    });
  }

  public openProductListDialog() {
    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
    const dialogRef = this.dialog.open(ProductListComponent, {
      data: { ids: this.selectedProducts && this.selectedProducts.length ? this.selectedProducts.map(m => m._id) : null },
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        if (dialogResult.data) {
          let selectedProducts: Product[];
          if (this.selectedProducts.length && dialogResult.data.unselectedIds) {
            selectedProducts = this.selectedProducts.filter((item) => {
              return dialogResult.data.unselectedIds.indexOf(item._id) === -1;
            });
          } else {
            selectedProducts = this.selectedProducts;
          }

          if (dialogResult.data.selected) {
            this.selectedProducts = dialogResult.data.selected.map(m => {
              return {
                ...m,
                ...{
                  quantity: 1,
                  selectedVariation: m.hasVariations === true ? m?.variationsOptions[0] : null,
                }
              }
            });
            // this.selectedProducts = this.utilsService.mergeArrayUnique(selectedProducts, mProducts);
          } else {
            // this.selectedProducts = this.utilsService.mergeArrayUnique(selectedProducts, []);
          }
          this.countTotal()
          console.log('this.selectedProducts', this.selectedProducts)

          // this.dataForm.patchValue({products: this.selectedProducts.map(m => m._id)});

        }
      }
    });
  }

  /**
   * CALCULATIONS
   */
  getSalePrice(product: Product): number {
    if (Number(product.offerDiscountType) === DiscountTypeEnum.PERCENTAGE) {
      const disPrice = (Number(product?.offerDiscountAmount) / 100) * product?.salePrice;
      return Math.floor(product?.salePrice - disPrice);
    } else if (Number(product.offerDiscountType) === DiscountTypeEnum.CASH) {
      return Math.floor(product?.salePrice - Number(product.offerDiscountAmount));
    } else {
      return Math.floor(product?.salePrice);
    }
  }



  /**
    * ON CHANGE
    * countTotal()
    * getVariations()
    * checkVariationSelection()
    * changeCartQuantity()
    * disableVariationSelection()
    */
  countTotal() {
    this.totalAmount = this.selectedProducts.reduce((prev, current) => {
      console.warn(prev)
      if (current.hasVariations) {
        return prev += current.selectedVariation.price * current.quantity
      } else {
        return prev += current.salePrice * current.quantity;
      }

    }, 0)
    console.warn(this.totalAmount)
  }

  getVariations(array) {
    if (array && array.length) {
      var value = "";
      array.map((item) => {
        value += item.value + " , "
      })
      return value.slice(0, -2)
    } else {
      return "N/A"
    }
  }

  selectedVariation($event, i: number, data) {
    const index = (event.target as HTMLInputElement).value;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Add new Or Edit This',
        message: 'Do you want to add new?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        data = { ...data, ...{ selectedVariation: data.variationsOptions[index] } }
        this.selectedProducts.push(data)
        console.warn(this.selectedProducts)
      } else {
        this.selectedProducts[i].selectedVariation = this.selectedProducts[i]?.variationsOptions[index]
      }

    });

  }

  checkVariationSelection(productVariation, selectedVariation) {
    // console.log(productVariation, selectedVariation)
    if (productVariation._id == selectedVariation._id) {
      return true;
    } else {
      return null;
    }
  }

  disableVariationSelection(d) {
    let find = false;
    this.selectedProducts.map((item) => {
      if (item.selectedVariation) {
        if (item.selectedVariation._id == d._id) {
          find = true;
        }
      }
    })
    if (find) {
      // console.warn("FIne")
      return true;
    } else {
      return null;
    }
  }


  changeCartQuantity(index: number, type: string) {
    if (type === 'descries') {
      if (this.selectedProducts[index].quantity == 1) {
        this.uiService.warn("You Can Select Less than 1")
      } else {
        this.selectedProducts[index].quantity--;
      }
    } else {
      this.selectedProducts[index].quantity++;
    }
    this.countTotal()
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

    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
  }


}
