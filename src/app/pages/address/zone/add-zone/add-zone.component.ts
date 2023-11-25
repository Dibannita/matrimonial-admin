import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ZoneService} from '../../../../services/common/zone.service';
import {Zone} from '../../../../interfaces/common/zone.interface';
import {Select} from '../../../../interfaces/core/select';
import {PRODUCT_STATUS} from '../../../../core/utils/app-data';
import {Division} from '../../../../interfaces/common/division.interface';
import {DivisionService} from '../../../../services/common/division.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {MatSelectChange} from '@angular/material/select';
import {AreaService} from '../../../../services/common/area.service';
import {Area} from '../../../../interfaces/common/area.interface';


@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {
  // Static Data
  productStatus: Select[] = PRODUCT_STATUS;

  // Store Data
  id?: string;
  zone?: Zone;
  divisions: Division[] = [];
  areas: Area[] = [];

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private zoneService: ZoneService,
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
        this.getZoneById();
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
      area: [null, Validators.required],
      name: [null, Validators.required],
      status: ['publish', Validators.required],
      priority: [null],
    });
  }

  private setFormValue() {
    if (this.zone) {
      this.dataForm.patchValue({
          ...this.zone,
          ...{
            division: this.zone.division._id,
            area: this.zone.area._id,
          }
        }
      );

      // Get Sub Category By Category
      if (this.zone.division) {
        this.getAreaByParentId(this.zone.division._id);
      }
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    const selectedDivision = this.divisions.find(f => f._id === this.dataForm.value.division);
    const selectedArea = this.areas.find(f => f._id === this.dataForm.value.area);

    const mData = {
      ...this.dataForm.value,
      ...{
        division: selectedDivision,
        area: selectedArea,
      }
    }

    if (this.zone) {
      this.updateZoneById(mData);
    } else {
      this.addZone(mData);

    }
  }

  /**
   * ON Division Select
   * onDivisionSelect()
   */
  onDivisionSelect(event: MatSelectChange) {
    if (event.value) {
      this.getAreaByParentId(event.value);
    }
  }


  /**
   * HTTP REQ HANDLE
   * getZoneById()
   * addZone()
   * updateZoneById()
   */
  private getZoneById() {
    this.subDataOne = this.zoneService.getZoneById(this.id)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.zone = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
  }

  private addZone(data: any) {
    this.spinnerService.show();
    this.subDataTwo = this.zoneService.addZone(data)
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

  private updateZoneById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.zoneService.updateZoneById(this.zone._id, data)
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

  private getAreaByParentId(divisionId: string) {
    const select = 'name'
    this.subDataFive = this.areaService.getAreaByParentId(divisionId, select)
      .subscribe(res => {
        this.areas = res.data;
      }, error => {
        console.log(error);
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
  }

}
