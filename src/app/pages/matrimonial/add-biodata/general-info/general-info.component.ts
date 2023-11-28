import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '../../../../interfaces/core/select';
import {
  BIODATA_TYPE,
  BLOODGROUP,
  COMPLEXION,
  HEIGHT,
  MARITALSTATUS,
} from '../../../../core/db/all-info.db';
import { StorageService } from '../../../../services/core/storage.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../../services/common/product.service';
import { Product } from '../../../../interfaces/common/product.interface';
import { UiService } from '../../../../services/core/ui.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  biodata: Select[] = BIODATA_TYPE;
  maritalStatus: Select[] = MARITALSTATUS;
  height: Select[] = HEIGHT;
  complexion: Select[] = COMPLEXION;
  bloodGroup: Select[] = BLOODGROUP;
  selectedType: any;
  id: string;
  private product: Product;
  dataForm: FormGroup;
  isLoader: boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.initialForm();

    this.subDataOne = this.activatedRoute.queryParamMap.subscribe(
      (qParamMap) => {
        this.id = qParamMap.get('id');
        if (this.id) {
          this.getProductById();
        } else {
          this.setData();
        }
      }
    );
  }

  /**
   * FORM METHODS
   * initialForm()
   * setData()
   * setFormData()
   * onFormSubmit()
   * onGoBack()
   */

  initialForm() {
    this.dataForm = this.fb.group({
      bioDataType: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      birthDay: [null, Validators.required],
      height: ['', Validators.required],
      complexion: ['', Validators.required],
      weight: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      nationality: ['', Validators.required],
      // whichFiqhDoYouFollow: ['', Validators.required],
      descriptionOfProfession: ['', Validators.required],
      howManyBrides: [null],
      specificReasonsDivorce: [null],
    });
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage(
      'MATRIMONIAL_GENERAL_INPUT'
    );
    if (data) {
      this.dataForm.setValue(data);
    }
  }

  private setFormData() {
    if (this.product) {
      this.dataForm.patchValue(this.product);
    }
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;
      if (this.id) {
        this.updateProductByUser();
      } else {
        this.storageService.storeDataToSessionStorage(
          'MATRIMONIAL_GENERAL_INPUT',
          this.dataForm.value
        );
        setTimeout(() => {
          this.isLoader = false;
          console.log(this.dataForm.value);
          this.router.navigate(['/add-biodata/address'], {
            queryParamsHandling: 'merge',
          });
        }, 500);
      }
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  maritalMethodData(event: any) {
    this.selectedType = event.target.value;
  }

  onGoBack() {
    history.back();
  }

  /**
   * HTTP REQ HANDLE
   * getProductById()
   * updateProductByUser()
   */
  private getProductById() {
    const select =
      'bioDataType howManyBrides specificReasonsDivorce maritalStatus birthDay height complexion weight bloodGroup nationality descriptionOfProfession';
    this.subDataOne = this.productService
      .getProductById(this.id, select)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.product = res.data;
            this.setFormData();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private updateProductByUser() {
    this.subDataTwo = this.productService
      .updateProductById(this.id, this.dataForm.value)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.success(res.message);
            this.isLoader = false;
            this.router.navigate(['/add-biodata/address'], {
              queryParamsHandling: 'merge',
            });
          }
        },
        error: (err) => {
          this.isLoader = false;
          console.log(err);
        },
      });
  }

  /**
   * On Destroy
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
