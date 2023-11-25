import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {ADMIN_PERMISSIONS, ADMIN_ROLES, GENDERS} from 'src/app/core/utils/app-data';
import {Admin} from 'src/app/interfaces/admin/admin';
import {Select} from 'src/app/interfaces/core/select';
import {AdminDataService} from 'src/app/services/admin/admin-data.service';
import {AdminService} from 'src/app/services/admin/admin.service';
import {UiService} from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit, OnDestroy {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  user?: Admin;

  // Static Data
  roles: Select[] = ADMIN_ROLES;
  permissions: Select[] = ADMIN_PERMISSIONS;
  genders: Select[] = GENDERS;
  hasAccess: Select[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'},
  ];
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminDataService: AdminDataService,
    private adminService: AdminService,
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
        this.getAdminById();
      }
    });
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.email],
      username: [null, Validators.required],
      phoneNo: [null, Validators.required],
      gender: [null, Validators.required],
      role: [null, Validators.required],
      permissions: [null, Validators.required],
      hasAccess: [null, Validators.required],
      password: [null],
      newPassword: [null]
    });
  }

  private setFormValue() {
    this.dataForm.patchValue({...this.user, ...{password: null}});
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.user) {
      this.updateAdminById();
    } else {
      this.adminRegistration();

    }

  }


  /**
   * HTTP REQ HANDLE
   * getAdminById
   * adminRegistration
   * updateAdminById
   */

  private getAdminById() {
    this.spinnerService.show();
    const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.adminDataService.getAdminById(this.id, select)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.user = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private adminRegistration() {
    this.spinnerService.show();
    const finalData = {
      ...this.dataForm.value,
      ...{username: this.generateUsername}
    };

    this.subDataOne = this.adminService.adminRegistration(finalData)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private updateAdminById() {
    this.spinnerService.show();
    // Delete Bad Field
    const mData = this.dataForm.value;
    delete mData.password;

    this.subDataThree = this.adminDataService.updateAdminById(this.user._id, mData)
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
   * GENERATE USER NAME
   */
  public get generateUsername(): string {
    if (this.dataForm && this.dataForm.value.username) {
      // const rs = this.dataForm.value.username.replace(/[^a-zA-Z ]/g, '');
      const rs = this.dataForm.value.username.replace(/[^A-Za-z0-9]/g, '');
      return rs.trim().toLowerCase();
    } else {
      return '';
    }
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
