import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators,} from '@angular/forms';
import {User} from 'src/app/interfaces/common/user.interface';
import {UiService} from '../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UsersService} from '../../../services/common/users.service';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {defaultUploadImage, GENDERS} from 'src/app/core/utils/app-data';
import {Select} from 'src/app/interfaces/core/select';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';

interface AccessOption {
  name: string;
  value: boolean;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  HasAccessControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );


  genders: Select[] = GENDERS;
  hasAccess: Select[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'},
  ];

  GenderControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  user?: User;


  // Image Picker
  pickedImage = defaultUploadImage;
  pickedMobileImage = defaultUploadImage;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private router: Router,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getUserById();
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
      name: [null],
      username: [null, Validators.required],
      address: [null],
      hasAccess: [null],
      gender: [null],
      password: [null],
      email: new FormControl(null, [Validators.email]),
      phoneNo: [null, Validators.required],
      profileImg: [null],
      transactionId: [null],
      amount: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.user);

    if (this.user && this.user.profileImg) {
      this.pickedImage = this.user.profileImg;
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {

      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.user) {

      this.updateUserById();

    } else {

      this.addUser();

    }
  }

  /**
   * HTTP REQ HANDLE
   * addUser()
   * getUserById()
   * updateUserById()
   * removeSingleFile()
   */


  private getUserById() {
    this.spinnerService.show();
    this.subDataOne = this.userService.getUsersById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.user = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addUser() {
    this.spinnerService.show();
    this.subDataTwo = this.userService.addUser(this.dataForm.value).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.pickedImage = defaultUploadImage;
        } else {
          this.uiService.warn(res.message);
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private updateUserById() {
    this.spinnerService.show();
    this.subDataThree = this.userService
      .updateUsersById(this.user._id, this.dataForm.value)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {

            this.uiService.success(res.message);

          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
        },
      });
  }


  /**
   * COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog(type: 'image' | 'mobileImage') {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
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
            this.dataForm.patchValue({mobileImage: image.url});
            this.pickedMobileImage = image.url;
          } else {
            this.dataForm.patchValue({profileImg: image.url});
            this.pickedImage = image.url;
          }
        }
      }
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
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }
}
