import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UiService } from '../../../services/core/ui.service';
import { Router } from '@angular/router';
import { ShippingChargeService } from '../../../services/common/shipping-charge.service';
import { ShippingCharge } from '../../../interfaces/common/shipping-charge.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-charge',
  templateUrl: './shipping-charge.component.html',
  styleUrls: ['./shipping-charge.component.scss'],
})
export class ShippingChargeComponent implements OnInit, OnDestroy {
  dataForm?: FormGroup;

  shippingCharge: ShippingCharge;

  // Store Data from param
  id?: string;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    public router: Router,
    private shopInformationService: ShippingChargeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // INIT FORM
    this.initFormGroup();

    // GET DATA
    this.getShippingCharge();
  }

  /**
   * FORMS METHODS
   * initFormGroup()
   * setFormData()
   * onSubmit()
   */
  private initFormGroup() {
    this.dataForm = this.fb.group({
      deliveryInDhaka: [null],
      deliveryOutsideDhaka: [null],
      deliveryOutsideBD: [null],
    });
  }

  private setFormData() {
    this.dataForm.patchValue(this.shippingCharge);
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required fields');
      return;
    }

    this.addShippingCharge(this.dataForm.value);
  }

  /**
   * HTTP REQ HANDLE
   * addShippingCharge()
   * getShippingCharge()
   */
  private addShippingCharge(data: any) {
    this.spinner.show();
    this.subDataOne = this.shopInformationService
      .addShippingCharge(data)
      .subscribe({
      next:res => {
      this.uiService.success(res.message);
      this.spinner.hide();
    }
  ,
   error: err => {
      this.spinner.hide();
      console.log(err);
    }
  });
  }

  private getShippingCharge() {
    this.spinner.show();
    this.subDataTwo = this.shopInformationService.getShippingCharge().subscribe(
      (res) => {
        this.shippingCharge = res.data;
        this.spinner.hide();
        this.setFormData();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
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
  }
}
