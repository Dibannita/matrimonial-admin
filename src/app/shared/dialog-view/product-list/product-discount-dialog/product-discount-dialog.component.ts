import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../interfaces/common/product.interface';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Select } from '../../../../interfaces/core/select';
import { DISCOUNT_TYPES } from '../../../../core/utils/app-data';
import { PricePipe } from '../../../pipes/price.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { UiService } from '../../../../services/core/ui.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../../services/common/product.service';
import { ReloadService } from '../../../../services/core/reload.service';

@Component({
  selector: 'app-product-variation-dialog',
  templateUrl: './product-discount-dialog.component.html',
  styleUrls: ['./product-discount-dialog.component.scss'],
  providers: [PricePipe],
})
export class ProductDiscountDialogComponent implements OnInit, OnDestroy {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Static Data
  discountTypes: Select[] = DISCOUNT_TYPES;

  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private pricePipe: PricePipe,
    private spinnerService: NgxSpinnerService,
    private uiService: UiService,
    private productService: ProductService,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<ProductDiscountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    // Set Form Data
    if (this.product) {
      this.setFormData();
    }
  }

  /**
   * FORM & FORM CONTROL
   * initDataForm()
   * setFormData()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      discountType: [null],
      discountAmount: [null],
    });
  }

  private setFormData() {
    this.dataForm.patchValue(this.product);
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      return;
    }
    this.updateProductById(this.dataForm.value);
  }

  /**
   * CALCULATIONS
   */
  public get newPrice() {
    let mProduct = { ...this.product };
    mProduct.discountAmount = this.dataForm.value.discountAmount;
    mProduct.discountType = this.dataForm.value.discountType;
    return this.pricePipe.transform(mProduct, 'salePrice');
  }

  /**
   * HTTP REQ HANDLE
   * updateProductById()
   */
  private updateProductById(data: any) {
    this.spinnerService.show();
    this.subDataOne = this.productService
      .updateProductById(this.product._id, data)
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.reloadService.needRefreshData$();
            this.uiService.success(res.message);
            this.onConfirmDialog();
          } else {
            this.uiService.warn(res.message);
          }
        },
        (error) => {
          this.spinnerService.hide();
          console.log(error);
        }
      );
  }

  /**
   * DIALOG Action
   * onCancelDialog()
   * onConfirmDialog()
   */
  onCancelDialog() {
    this.dialogRef.close({ data: null });
  }

  onConfirmDialog() {
    this.dialogRef.close({
      data: 'Success',
    });
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
}
