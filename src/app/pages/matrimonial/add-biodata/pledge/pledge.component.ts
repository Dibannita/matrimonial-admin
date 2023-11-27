import {Component, OnInit} from '@angular/core';
import {Select} from "../../../../interfaces/core/select";
import {AGREE} from "../../../../core/db/all-info.db";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {Subscription} from 'rxjs';
import {ProductService} from '../../../../services/common/product.service';
import {UiService} from '../../../../services/core/ui.service';
import {Product} from "../../../../interfaces/common/product.interface";
import {StorageService} from "../../../../services/core/storage.service";

@Component({
  selector: 'app-pledge',
  templateUrl: './pledge.component.html',
  styleUrls: ['./pledge.component.scss']
})
export class PledgeComponent implements OnInit {
  agree: Select[] = AGREE;

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
    private uiService: UiService,
  ) {
  }

  ngOnInit(): void {
    this.initialForm();

    this.subDataOne = this.activatedRoute.queryParamMap.subscribe(qParamMap => {
      this.id = qParamMap.get('id');
      if (this.id) {
        this.getProductById();
      } else {
        this.setData();
      }
    })
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
      song: ['', Validators.required],
      facebook: ['', Validators.required],
      salat: [null, Validators.required],
      physicalDiseases: [null, Validators.required],
      // pordha: [null, Validators.required],
      readQuranSuddho: [null, Validators.required],
      readQuranDaily: [null, Validators.required],
      gunaho: [null, Validators.required],
      // motamot: [null, Validators.required],
    });
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_PLEDGE');
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


        this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_PLEDGE', this.dataForm.value)
        setTimeout(() => {
          this.isLoader = false;
          this.router.navigate(['/add-biodata/marriage-info'], {queryParamsHandling: 'merge'});
        }, 500);
      }

    } else {
      this.dataForm.markAllAsTouched();


    }
  }

  // For form back button
  onGoBack() {
    history.back();
  }

  /**
   * HTTP REQ HANDLE
   * getProductById()
   * updateProductByUser()
   */
  private getProductById() {
    const select = 'motamot gunaho readQuranDaily readQuranSuddho pordha physicalDiseases salat facebook song'
    this.subDataOne = this.productService.getProductById(this.id, select).subscribe({
      next: res => {
        if (res.success) {
          this.product = res.data;
          this.setFormData();
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private updateProductByUser() {
    this.subDataTwo = this.productService.updateProductById(this.id, this.dataForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoader = false;
          this.router.navigate(['/add-biodata/marriage-info'], {queryParamsHandling: 'merge'});
        }
      },
      error: err => {
        this.isLoader = false;
        console.log(err)
      }
    })

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
