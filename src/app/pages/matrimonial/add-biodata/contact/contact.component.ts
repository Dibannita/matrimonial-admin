import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {StorageService} from '../../../../services/core/storage.service';
import {ProductService} from '../../../../services/common/product.service';
import {UiService} from '../../../../services/core/ui.service';
import {Product} from '../../../../interfaces/common/product.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  autoSlug = true;

  id: string;
  private product: Product;
  dataForm: FormGroup;
  isLoader: boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private productAutoSlug: Subscription;


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
    this.autoGenerateSlug();
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
      name: ['', Validators.required],
      relationshipGuardian: ['', Validators.required],
      guardianNumber: [null, Validators.required],
      receiveBiodata: ['', Validators.required],
      slug: [null],
    });
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_CONTACT');
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
      } else{
        this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_CONTACT', this.dataForm.value);
        const general = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_INPUT');
        const address = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_ADDRESS');
        const education = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_EDUCATION');
        const family = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_FAMILY');
        const partner = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_PARTNER');
        const pledge = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_PLEDGE');
        const marriage = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_MARRIAGE');
        const contact = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_CONTACT');

        const finalData = {
          ...general,
          ...address,
          ...education,
          ...family,
          ...partner,
          ...pledge,
          ...marriage,
          ...contact,
          ...{
            postType: 'matrimonial',
            status: 'publish'
          }
        };
        if (this.id) {
          this.updateProductByUser();
        } else {
          this.addProduct(finalData);
        }
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
   * addProduct()
   * updateProductByUser()
   */
  private getProductById() {
    const select = 'name relationshipGuardian guardianNumber receiveBiodata slug'
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

  private addProduct(data: any) {
    this.subDataTwo = this.productService.addProduct(data).subscribe(res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoader = false;
          // this.router.navigate(['/account/orders'])
        }
      },
      (err) => {
        this.isLoader = false;
        this.uiService.wrong('Something went wrong!');
        console.log(err);
      }
    )
  }

  private updateProductByUser() {
    this.subDataThree = this.productService.updateProductById(this.id, this.dataForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoader = false;
          // this.router.navigate(['/account/orders']);
        }
      },
      error: err => {
        this.isLoader = false;
        console.log(err)
      }
    })

  }


  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.productAutoSlug = this.dataForm.get('name').valueChanges
        .pipe(
        ).subscribe(d => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res
          });
        });
    } else {
      if (!this.productAutoSlug) {
        return;
      }
      this.productAutoSlug?.unsubscribe();
    }
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
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
  }


}
