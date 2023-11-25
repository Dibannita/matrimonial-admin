import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from '../../../services/core/ui.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Select } from '../../../interfaces/core/select';
import { ORDER_STATUS } from '../../../core/utils/app-data';
import { OrderStatus } from '../../../enum/order.enum';
import { Order } from '../../../interfaces/common/order.interface';

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.scss'],
})
export class UpdateOrderStatusComponent implements OnInit, OnDestroy {
  // Form Template Ref
  @ViewChild('templateForm') templateForm: NgForm;

  dataForm?: FormGroup;
  private sub: Subscription;

  public orderEnum = OrderStatus;

  autoSlug = true;
  isLoading = false;

  // Store Data from param
  order: Order = null;

  today = new Date();

  orderStatus: Select[] = ORDER_STATUS;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    public dialogRef: MatDialogRef<UpdateOrderStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      orderStatus: [null, Validators.required],
    });

    if (this.data) {
      this.order = this.data;
      this.dataForm.patchValue({ orderStatus: this.order.orderStatus });
    }
  }
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required fields');
      return;
    }

    this.onCloseDialog(this.dataForm.value);
  }

  /**
   * HTTP REQ HANDLE
   * GET ATTRIBUTES BY ID
   * showDateField()
   */

  get showDateField(): boolean {
    if (this.dataForm.value) {
      switch (this.dataForm.value.orderStatus) {
        case this.orderEnum.CANCEL: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
        case this.orderEnum.PROCESSING: {
          this.dataForm
            .get('nextPhaseDate')
            .setValidators([Validators.required]);
          return true;
        }
        case this.orderEnum.CONFIRM: {
          this.dataForm
            .get('nextPhaseDate')
            .setValidators([Validators.required]);
          return true;
        }
        case this.orderEnum.DELIVERED: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
        case this.orderEnum.REFUND: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
        case this.orderEnum.SHIPPING: {
          this.dataForm
            .get('nextPhaseDate')
            .setValidators([Validators.required]);
          return true;
        }
        default: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
      }
    }
  }

  /**
   * ON CLOSE DIALOG
   */
  onCloseDialog(data: any) {
    this.dialogRef.close({ data: data });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
