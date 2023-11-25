import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {StorageService} from '../../../services/core/storage.service';
import {ProductService} from '../../../services/common/product.service';
import {UiService} from '../../../services/core/ui.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  autoSlug = true;
  dataForm!: FormGroup;
  isLoading: boolean = false;

  id: string;

  //Subscriptions
  private productAutoSlug: Subscription;
  private subDataOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private productService: ProductService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initialForm();
    this.setData();
    this.autoGenerateSlug();

    this.subDataOne = this.activatedRoute.queryParamMap.subscribe(qParamMap => {
      this.id = qParamMap.get('id');
      // if (this.id) {
      //   this.getProductById(this.id);
      // }
    })
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_CONTACT');
    if (data) {
      this.dataForm.setValue(data);
    }
  }

  initialForm() {
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      relationshipGuardian: ['', Validators.required],
      guardianNumber: [null, Validators.required],
      receiveBiodata: ['', Validators.required],
      slug: [null],
    });
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoading = true;

      this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_CONTACT', this.dataForm.value);


      const general = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_INPUT');
      const address = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_ADDRESS');
      const education = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_EDUCATION');
      const pledge = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_PLEDGE');
      const contact = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_CONTACT');

      const finalData = {
        ...general,
        ...address,
        ...education,
        ...pledge,
        ...contact,
        ...{
          postType: 'matrimonial',
          status: 'publish'
        }
      };
      if (this.id) {
        this.updateProduct(finalData);
      } else {
        this.addProduct(finalData);
      }


    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  // For form back button
  onGoBack() {
    history.back();
  }

  private addProduct(data: any) {
    this.productService.addProduct(data).subscribe(res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoading = false;
          // this.router.navigate(['/account/orders'])
        }
      },
      (err) => {
        this.isLoading = false;
        this.uiService.wrong('Something went wrong!');
        console.log(err);
      }
    )
  }

  private updateProduct(data) {

    this.productService.updateProductById(this.id, data).subscribe(res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoading = false;
          // this.router.navigate(['/account/orders']);
        }
      },
      (err) => {
        this.isLoading = false;
        if (err) {
          console.log(err);
        }
      }
    )

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


}
