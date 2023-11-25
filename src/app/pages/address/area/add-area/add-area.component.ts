import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AreaService} from '../../../../services/common/area.service';
import {Area} from '../../../../interfaces/common/area.interface';
import {Select} from '../../../../interfaces/core/select';
import {PRODUCT_STATUS} from '../../../../core/utils/app-data';
import {Division} from '../../../../interfaces/common/division.interface';
import {DivisionService} from '../../../../services/common/division.service';
import {FilterData} from '../../../../interfaces/core/filter-data';


@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent implements OnInit {
  // Static Data
  productStatus: Select[] = PRODUCT_STATUS;

  // Store Data
  id?: string;
  area?: Area;
  divisions: Division[] = [];

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private areaService: AreaService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private divisionService: DivisionService,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getAreaById();
      }
    });

    // Base Data
    this.getAllDivisions();
  }


  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      division: [null, Validators.required],
      name: [null, Validators.required],
      status: ['publish', Validators.required],
      priority: [null],
    });
  }

  private setFormValue() {
    if (this.area) {
      this.dataForm.patchValue({
          ...this.area,
          ...{
            division: this.area.division._id,
          }
        }
      );
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    const selectedDivision = this.divisions.find(f => f._id === this.dataForm.value.division);

    const mData = {
      ...this.dataForm.value,
      ...{division: selectedDivision}
    }

    if (this.area) {
      this.updateAreaById(mData);
    } else {
      this.addArea(mData);

    }
  }


  /**
   * HTTP REQ HANDLE
   * getAreaById()
   * addArea()
   * updateAreaById()
   */
  private getAreaById() {
    this.subDataOne = this.areaService.getAreaById(this.id)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.area = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
  }

  private addArea(data: any) {
    this.spinnerService.show();
    this.subDataTwo = this.areaService.addArea(data)
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

  private updateAreaById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.areaService.updateAreaById(this.area._id, data)
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

  private getAllDivisions() {
    // Select
    const mSelect = {
      name: 1,
    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {priority: 1}
    }


    this.subDataFour = this.divisionService.getAllDivisions(filterData, null)
      .subscribe({
        next: (res => {
          this.divisions = res.data;
        }),
        error: (error => {
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
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
  }

}
