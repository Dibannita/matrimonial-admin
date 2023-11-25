import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { defaultUploadImage } from '../../../../core/utils/app-data';
import { DiscountTypeEnum } from '../../../../enum/product.enum';
import { Product } from '../../../../interfaces/common/product.interface';
import { PromoOffer } from '../../../../interfaces/common/promo-offer.interface';
import { Gallery } from '../../../../interfaces/gallery/gallery.interface';
import { PromoOfferService } from '../../../../services/common/promo-offer.service';
import { UiService } from '../../../../services/core/ui.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ProductListComponent } from '../../../../shared/dialog-view/product-list/product-list.component';
import { AllImagesDialogComponent } from '../../../gallery/images/all-images-dialog/all-images-dialog.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-promo-offer.component.html',
  styleUrls: ['./add-promo-offer.component.scss'],
})
export class AddPromoOfferComponent implements OnInit, OnDestroy {


  // Store Data
  id?: string;
  viewOnly?: boolean;
  promoOffer?: PromoOffer;
  selectedProducts: Product[] = [];

  // Image Picker
  pickedImage = defaultUploadImage;
  pickedMobileImage = defaultUploadImage;


  // Subscriptions
  private subDataOne: Subscription;
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
    private promoOfferService: PromoOfferService,
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
        this.getPromoOfferById();
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
      title: [null, Validators.required],
      titleBn: [null],
      titleIt: [null],
      description: [null],
      descriptionBn: [null],
      descriptionIt: [null],
      bannerImage: [null],
      startDateTime: [null],
      endDateTime: [null],
    });
  }

  private setDataForm() {
    if (this.promoOffer) {
      this.dataForm.patchValue(this.promoOffer);
      this.selectedProducts = this.promoOffer.products.map(m => {
        return {
          ...m.product as Product,
          ...{
            offerDiscountAmount: m.offerDiscountAmount ? m.offerDiscountAmount : (m.product as Product).discountAmount,
            offerDiscountType: m.offerDiscountType ? m.offerDiscountType : (m.product as Product).discountType,
            resetDiscount: m.resetDiscount
          }
        } as Product
      });



      if (this.promoOffer && this.promoOffer.bannerImage) {
        this.pickedImage = this.promoOffer.bannerImage;
      }

    }
  }

  onSubmit() {

    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      this.dataForm.markAllAsTouched();
      return;
    }

    if (!this.selectedProducts.length) {
      this.uiService.warn('Please select product');
      return;
    }

    const mData = {
      ...this.dataForm.value,
      ...{
        products: this.selectedProducts.map(m => {
          return {
            product: m._id,
            offerDiscountType: m.offerDiscountType ? Number(m.offerDiscountType) : null,
            offerDiscountAmount: m.offerDiscountAmount ? Number(m.offerDiscountAmount) : null,
            resetDiscount: m.resetDiscount,
          }
        })
      }
    }

    // if (this.id) {
    //   this.updatePromoOfferById(mData)
    // } else {
    //   this.addPromoOffer(mData);
    // 

    if (this.promoOffer) {
      this.updatePromoOfferById(mData);
    } else {
      this.addPromoOffer(mData);
    }

  }


  /**
   * ACTION
   * removeProduct()
   */
  removeProduct(i: number) {
    this.selectedProducts.splice(i, 1);
    this.dataForm.patchValue({ products: this.selectedProducts.map(m => m._id) })
  }

  /**
   * HTTP REQ HANDLE
   * addPromoOffer()
   * getPromoOfferById()
   * updatePromoOfferById()
   */
  private addPromoOffer(data: any) {


    this.spinnerService.show();
    this.subDataOne = this.promoOfferService.addPromoOffer(data)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.resetValue();
            this.pickedImage = defaultUploadImage;
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error)
        })
      });
  }

  private getPromoOfferById() {
    this.spinnerService.show();
    this.subRouteTwo = this.promoOfferService.getPromoOfferById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.promoOffer = res.data;
            this.setDataForm();
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error)
        })
      });
  }

  private updatePromoOfferById(data: any) {


    this.spinnerService.show();
    this.subDataThree = this.promoOfferService.updatePromoOfferById(this.promoOffer._id, data)
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
            this.dataForm.patchValue({ bannerImage: image.url });
            this.pickedImage = image.url;
          }
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
            const mProducts = dialogResult.data.selected.map(m => {
              return {
                ...m,
                ...{
                  selectedQty: 1,
                  offerDiscountAmount: m.discountAmount,
                  offerDiscountType: m.discountType,
                  resetDiscount: true,
                }
              }
            });
            this.selectedProducts = this.utilsService.mergeArrayUnique(selectedProducts, mProducts);

          } else {
            this.selectedProducts = this.utilsService.mergeArrayUnique(selectedProducts, []);
          }

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
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
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
