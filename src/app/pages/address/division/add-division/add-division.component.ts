import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DivisionService} from '../../../../services/common/division.service';
import {Division} from '../../../../interfaces/common/division.interface';
import {Select} from '../../../../interfaces/core/select';
import {PRODUCT_STATUS} from '../../../../core/utils/app-data';


@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss']
})
export class AddDivisionComponent implements OnInit {
  // Static Data
  productStatus: Select[] = PRODUCT_STATUS;

  // Store Data
  id?: string;
  division?: Division;

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private divisionService: DivisionService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getDivisionById();
      }
    });
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
      status: ['publish', Validators.required],
      priority: [null],
    });
  }

  private setFormValue() {
    if (this.division) {
      this.dataForm.patchValue(this.division);
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.division) {
      this.updateDivisionById();
    } else {
      this.addDivision();

    }
  }


  /**
   * HTTP REQ HANDLE
   * getDivisionById()
   * addDivision()
   * updateDivisionById()
   */
  private getDivisionById() {
    this.subDataOne = this.divisionService.getDivisionById(this.id)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.division = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
  }

  private addDivision() {
    this.spinnerService.show();
    this.subDataTwo = this.divisionService.addDivision(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
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

  private updateDivisionById() {
    this.spinnerService.show();
    this.subDataThree = this.divisionService.updateDivisionById(this.division._id, this.dataForm.value)
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
  }

}
