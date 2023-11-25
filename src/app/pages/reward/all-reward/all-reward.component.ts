import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Reward} from '../../../interfaces/common/reward.interface';
import {Subscription} from 'rxjs';
import {UiService} from '../../../services/core/ui.service';
import {Router} from '@angular/router';
import {RewardService} from '../../../services/common/reward.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-all-reward',
  templateUrl: './all-reward.component.html',
  styleUrls: ['./all-reward.component.scss']
})
export class AllRewardComponent implements OnInit, OnDestroy {
  dataForm?: FormGroup;

  shippingCharge: Reward;

  // Store Data from param
  id?: string;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    public router: Router,
    private shopInformationService: RewardService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // INIT FORM
    this.initFormGroup();

    // GET DATA
    this.getReward();
  }

  /**
   * FORMS METHODS
   * initFormGroup()
   * setFormData()
   * onSubmit()
   */
  private initFormGroup() {
    this.dataForm = this.fb.group({
      rewardPoint: [null],
      rewardValue: [null],
      rewardWithdrawAmount: [null],
      rewardWithdrawPurchaseAmount: [null],
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

    this.addReward(this.dataForm.value);
  }

  /**
   * HTTP REQ HANDLE
   * addReward()
   * getReward()
   */
  private addReward(data: any) {
    this.spinner.show();
    this.subDataOne = this.shopInformationService
      .addReward(data)
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

  private getReward() {
    this.spinner.show();
    this.subDataTwo = this.shopInformationService.getReward().subscribe(
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
